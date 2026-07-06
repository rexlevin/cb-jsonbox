/**
 * cb-jsonbox — 主进程入口
 *
 * 标准 Electron APP，通过 canbox-core 注入启动：
 *   electron -r canbox-core/injection.js cb-jsonbox/
 *
 * canbox-core 负责环境初始化（统一 userData、日志）与公共服务 IPC
 *（store/db/window 等），本文件只负责创建窗口并加载前端页面。
 */

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
    // 从 core store 读取上次窗口状态
    const CORE_PATH = global.__CANBOX_CORE_PATH__;
    const store = require(path.join(CORE_PATH, 'lib', 'store'));
    const winStateStore = store.getStore('cb-jsonbox', 'winState', path.join(global.__CANBOX_ENV__.usersPath, 'data'));
    const savedBounds = winStateStore.get('bounds');

    mainWindow = new BrowserWindow({
        width: savedBounds ? savedBounds.width : 700,
        height: savedBounds ? savedBounds.height : 500,
        x: savedBounds ? savedBounds.x : undefined,
        y: savedBounds ? savedBounds.y : undefined,
        minWidth: 350,
        minHeight: 200,
        resizable: true,
        icon: path.join(__dirname, 'logo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false
        }
    });

    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
        mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
    }

    // 窗口关闭前：保存窗口状态 + 同步保存 box 数据
    mainWindow.on('close', (event) => {
        event.preventDefault();

        // 1. 保存窗口 bounds（主进程同步写 store）
        const bounds = mainWindow.getBounds();
        winStateStore.set('bounds', bounds);

        // 2. 通过 executeJavaScript 读取渲染进程的 box 数据并保存
        mainWindow.webContents.executeJavaScript(
            `window.__boxDataForSave || null`
        ).then(boxData => {
            if (boxData) {
                const sessionStore = store.getStore('cb-jsonbox', 'session', path.join(global.__CANBOX_ENV__.usersPath, 'data'));
                sessionStore.set('box', boxData);
            }
        }).catch(() => {
            // 忽略读取失败
        }).finally(() => {
            // 解除 close 监听，真正关闭
            mainWindow.removeAllListeners('close');
            mainWindow.close();
        });
    });
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
