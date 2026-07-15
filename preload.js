/**
 * cb-jsonbox preload
 *
 * 通过 ipcRenderer.invoke 调用 IPC 通道，再用 contextBridge 暴露给渲染进程。
 *
 * 对外暴露的 window.api 方法签名保持与旧架构一致，前端组件无需改动：
 * - notification(title, opt)  系统通知（jsonbox.notification，APP 自有）
 * - saveBox(box)              保存会话（canbox.store.set，canbox-core 提供）
 * - getBox(callback)          读取会话（canbox.store.get，canbox-core 提供）
 * - sid()                     生成短 id（nanoid，不依赖 core）
 */
const { contextBridge, ipcRenderer, webFrame } = require('electron');
const { customAlphabet } = require('nanoid');
const path = require('path');
const pkg = require(path.join(__dirname, 'package.json'));

// 校验 canbox-core 是否已通过 -r injection.js 注入
ipcRenderer.invoke('canbox.misc.hello').then(() => {
    console.log('[cb-jsonbox preload] canbox-core 已加载');
}).catch(err => {
    console.error('[cb-jsonbox preload] canbox-core 未加载: %o', err);
});

window.addEventListener('DOMContentLoaded', () => {
    document.title = pkg.description + ' - v' + pkg.version;
});

contextBridge.exposeInMainWorld('api', {
    notification: (title, opt) => {
        const options = {
            title,
            body: opt && opt.body,
            icon: path.join(__dirname, 'logo.png')
        };
        ipcRenderer.invoke('jsonbox.notification', options).then(() => {
            console.log('[cb-jsonbox preload] 通知已成功发送');
        }).catch(err => {
            console.error('[cb-jsonbox preload] 通知发送失败: %o', err);
        });
    },
    saveBox: (box) => {
        return ipcRenderer.invoke('canbox.store.set', 'session', 'box', box);
    },
    getBox: (callback) => {
        ipcRenderer.invoke('canbox.store.get', 'session', 'box').then(ret => {
            callback(ret || null);
        }).catch(err => {
            console.error('[cb-jsonbox preload] getBox 失败: %o', err);
            callback(null);
        });
    },
    sid: () => {
        const nanoid = customAlphabet('23456789ABDEFGHJLMNQRTY', 8);
        return nanoid();
    },
    setZoom: (factor) => {
        webFrame.setZoomFactor(factor);
    }
});
