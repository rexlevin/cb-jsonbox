const { contextBridge } = require('electron');
const { customAlphabet } = require('nanoid');    // nanoid是内部的函数，记得要加{}包起来，否则报错nanoid is not a function
// console.info('__dirname: ', __dirname);
const path = require('path');
const app = require(path.join(__dirname, 'app.json'));

canbox.hello();

window.addEventListener('DOMContentLoaded', () => {
    document.title = app.description + ' - v' + app.version;
});

contextBridge.exposeInMainWorld(
    'api', {
    notification: (title, opt) => {
        const options = {...opt, icon: path.join(__dirname, 'logo.png')};
        // new window.Notification(title, options);
        canbox.win.notification({title, body: options.body}).then(()=>{
            console.log('通知已成功发送');
        }).catch(err=>{
            console.error('err in notification===%o', err);
        });
    },
    openWindow: (options, params) => {
        console.info('openWindow, options=%o', options);
        console.info('openWindow, params=%o', params);
        canbox.win.createWindow(options, params).then((res) => {
            console.info('res===', res);
        }, (err) => {
            console.info('err===', err);
        });
    },
    saveBox: (box) => {
        return new Promise((resolve, reject) => {
            canbox.db.get({_id: 'box'}).then(res => {
                console.info('now can get box %s, update it', res._rev);
                canbox.db.put({
                    _id: 'box',
                    _rev: res._rev,
                    box
                }).then(() => {
                    console.info('update db box ok: %o', res)
                    resolve();
                }).catch(err => {
                    console.info('err in update db %o', err)
                    reject(err);
                });
            }).catch(err => {
                console.info('err in get===%o, now add a new record to db', err);
                canbox.db.put({
                    _id: 'box',
                    box
                });
                // reject(err);
            });
        });
    },
    getBox: (callback) => {
        let ret = canbox.db.getSync({_id: 'box'});
        callback(ret?.box || null);
        // canbox.db.get({_id: 'box'}).then(data => {
        //     callback(data.box);
        // }).catch(err => {
        //     console.info('err in getBox===%o', err);
        //     callback(null);
        // });
    },
    sid: () => {
        const nanoid = customAlphabet('23456789ABDEFGHJLMNQRTY', 8)
        return nanoid();
    },
    // saveWindowState: (isMax, mainPosition) => {
    //     console.info(isMax, mainPosition);
    // },
    getSettings: (fn) => {
    }
});
