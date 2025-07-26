const { contextBridge } = require('electron');
// const { customAlphabet } = require('nanoid');    // nanoid是内部的函数，记得要加{}包起来，否则报错nanoid is not a function
// console.info('__dirname: ', __dirname);
const path = require('path');
const app = require(path.join(__dirname, 'package.json'));

console.info('here is preload.js, appId: ', appId);    // 即：console.info(window.appId);
canbox.hello();  // 即：window.canbox.hello();

contextBridge.exposeInMainWorld(
    'api', {
    notification: (title, options) => {
        options = Object.assign({
            icon: path.join(__dirname, 'logo.png'),
        }, options);
        new window.Notification(title, options);
    },
    reload: () => {
        ipcRenderer.send('reload');
    },
    openDevTools: () => {
        ipcRenderer.send('openDevTools');
    },
    openWindow: (url, name, options) => {
        console.info('openWindow, url=%s, name=%s, option=%o', url, name, options);
        ipcRenderer.send('openWindow', url, name, options);
    },
    saveBox: (box) => {
        store.set('box', JSON.parse(box));
    },
    savePosition(isMax, position) {
        store.set('isMax', isMax);
        store.set('position', position);
        return;
    },
    getBox: (callback) => {
        callback(null);
        return;
        // console.info('box from store===%o', (store.get('box') || null));
        // callback(store.get('box') || null);
    },
    sid: () => {
        const nanoid = customAlphabet('23456789ABDEFGHJLMNQRTY', 8)
        console.info('nanoid: ', nanoid);
        return nanoid();
    },
    saveWindowState: (isMax, mainPosition) => {
        console.info(isMax, mainPosition);
    },
    saveSettings: () => {},
    getSettings: (fn) => {
        console.info('asdf' + localStorage.getItem('settings'));
        return localStorage.getItem('settings');
    },
    closeApp(fn) {
        ipcRenderer.on('closeApp', fn);
    },
    closeAppReply() {
        ipcRenderer.send('close-reply', 'ok');
    }
});
