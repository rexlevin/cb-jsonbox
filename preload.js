const { contextBridge } = require('electron');
const { customAlphabet } = require('nanoid');    // nanoid是内部的函数，记得要加{}包起来，否则报错nanoid is not a function
// console.info('__dirname: ', __dirname);
const path = require('path');
const app = require(path.join(__dirname, 'app.json'));

console.info('here is preload.js, appId: ', appId);    // 即：console.info(window.appId);
canbox.hello();  // 即：window.canbox.hello();

window.addEventListener('DOMContentLoaded', () => {
    document.title = app.description + ' - v' + app.version;
});

// window.addEventListener('beforeunload', (e) => {
//     e.preventDefault();
// });

const rev = '';

contextBridge.exposeInMainWorld(
    'api', {
    notification: (title, options) => {
        options = Object.assign({
            icon: path.join(__dirname, 'logo.png'),
        }, options);
        new window.Notification(title, options);
    },
    reload: () => {
        // ipcRenderer.send('reload');
    },
    openDevTools: () => {
        // ipcRenderer.send('openDevTools');
    },
    openWindow: (url, name, options) => {
        console.info('openWindow, url=%s, name=%s, option=%o', url, name, options);
        // ipcRenderer.send('openWindow', url, name, options);
    },
    saveBox: (box) => {
        // store.set('box', JSON.parse(box));
        canbox.db.put({
            _id: 'box',
            box,
            rev
        }).then(res => {
            console.info('res in put===%o', res);
        }).catch(err => {
            console.info('err in put===%o', err);
        });
    },
    savePosition(isMax, position) {
        store.set('isMax', isMax);
        store.set('position', position);
        return;
    },
    getBox: (callback) => {
        console.trace('getBox called from:');
        canbox.db.get({_id: 'box'}).then(data => {
            console.info('data from db===%o', data);
            rev = data._rev;
            callback(data);
        }).catch(err => {
            console.info('err in getBox===%o', err);
            callback(null);
        });
    },
    sid: () => {
        const nanoid = customAlphabet('23456789ABDEFGHJLMNQRTY', 8)
        return nanoid();
    },
    saveWindowState: (isMax, mainPosition) => {
        console.info(isMax, mainPosition);
    },
    saveSettings: () => {},
    getSettings: (fn) => {
    },
    closeApp(fn) {
        console.info('now close app');
        // ipcRenderer.on('closeApp', fn);
    },
    closeAppReply() {
        // ipcRenderer.send('close-reply', 'ok');
    }
});
