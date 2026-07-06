<template>
    <div id="container">
        <header>
            <div class="tabs header">
                <ul>
                    <li v-for="(item, index) in box.data" :class="item.id == box.activeId ? 'tab-selected' : 'tab-default'" @click="switchTab(item.id)">{{item.title}}</li>
                </ul>
            </div>
        </header>
        <main>
            <div class="editor" ref="editor">
                <div class="editor-placeholder"># Placeholder Example</div>
            </div>
        </main>
        <footer>
            <div class="bottom">
                <div class="divSettings">
                    <span class="icon-span" @click="openSettings"><i class="bi bi-sliders icon"></i></span>
                </div>
                <div style="height: 100%;"></div>
                <div class="btngroup">
                    <!-- <span class="icon-span" title="格式化 shift+alt+f"><i class="bi bi-braces icon"></i></span> -->
                    <span class="icon-span" @click="copy('minify')" title="复制压缩"><i class="bi bi-chevron-contract icon"></i></span>
                    <span class="icon-span" @click="copy('yaml')" title="复制为yaml"><i class="bi bi-filetype-yml icon"></i></span>
                    <span class="icon-span" @click="copy('xml')" title="复制为xml"><i class="bi bi-code-slash icon"></i></span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import * as monaco from 'monaco-editor';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash-es';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@/lib/simple-ui/ui.css';

import X2js from 'x2js';
import * as Yaml from "@/lib/json.yaml";
import * as FormatXml from "@/lib/format.xml";

import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

const tmpJ = {
    id: '',
    type: 0,    // 当前 json 类型，0-会话，1-文件
    title: "",
    path: '',
    content: ''
};
const tmpBox = {
    activeId: '',
    tabTitleIndex: 0,
    data: []
};

const box = ref({ data: [] });
const router = useRouter();

// 监听键盘事件
const handleKeydown = (event) => {
    // console.info(event);
    const keyActions = {
        'alt+s': openSettings,
        'ctrl+t': createTab,
        'ctrl+w': closeTab
    };

    const keyCombination = [
        event.altKey ? 'alt' : '',
        event.ctrlKey ? 'ctrl' : '',
        event.key.toLowerCase()
    ].filter(Boolean).join('+');

    const action = keyActions[keyCombination];
    if (action) {
        action();
    }
};

self.MonacoEnvironment = {
    getWorker: function(moduleId, label) {
        return new JsonWorker();
    }
};

let isGetBoxCalled = false;
onBeforeMount(() => {
    console.info('box === %o', box);
    if (isGetBoxCalled) return;
    isGetBoxCalled = true;
    // 从存储中查询 boxes 数据
    window.api.getBox(res => {
        console.info('store====res=%o', res);
        if (res) {
            box.value = JSON.parse(res);
            window.__boxDataForSave = res;
            console.info(box.value.data);
            // editor 可能已创建（onMounted 先于 getBox 回调），重新加载 active tab 内容
            if (editorInstance && editorInstance.setValue) {
                init();
            }
            return;
        }
        box.value = Object.assign({}, tmpBox);
        let id = window.api.sid();
        let j = Object.assign({}, tmpJ);
        box.value.data.push(Object.assign(j, {id: id, title: "NewTab 0"}));
        box.value.activeId = id;
        window.__boxDataForSave = JSON.stringify(box.value);
    });
});

let editorInstance = ref(null);
onMounted(() => {
    // 挂载键盘监听
    window.addEventListener('keydown', handleKeydown);
    editorInstance = monaco.editor.create(document.querySelector('.editor'), {
        value: '',
        language: 'json',
        autoIndent: true,   // 自动缩进
        automaticLayout: true,  // 自适应布局
        overviewRulerBorder: false, // 不要滚动条的边框
        formatOnPaste: true,    // 粘贴即格式化，默认false
        formatOnType: true,     // 按键即格式化，默认false
        contextmenu: true,     // 右键菜单
        fontSize: 17,
        mouseWheelZoom: true
    });
    showPlaceholder('');
    editorInstance.onDidBlurEditorWidget(() => {
        showPlaceholder(editorInstance.getValue());
    });
    editorInstance.onDidFocusEditorWidget(() => {
        hidePlaceholder();
    });
    let lastBoxData = null;
    const saveBoxDebounced = debounce((boxData) => {
        const currentBoxData = JSON.stringify(boxData);
        const lastBoxDataStr = lastBoxData ? JSON.stringify(lastBoxData) : null;
        if (currentBoxData !== lastBoxDataStr) {
            lastBoxData = JSON.parse(currentBoxData); // 深拷贝
            window.api.saveBox(JSON.stringify(boxData));
        } else {
        }
    }, 1000);

    // 监听 box 变化：同步更新 window.__boxDataForSave（供主进程 close 时读取）+ 防抖异步保存
    watch(box, (newValue) => {
        window.__boxDataForSave = JSON.stringify(newValue);
        saveBoxDebounced(newValue);
    }, { deep: true, flush: 'sync' });

    let isUserModified = false;
    editorInstance.onDidChangeModelContent(() => {
        if (!isUserModified) return; // 非用户修改时跳过保存
        const activeTab = box.value.data.find(tab => tab.id === box.value.activeId);
        if (activeTab) {
            activeTab.content = editorInstance.getValue();
        }
    });

    // 切换标签页时临时禁用保存
    const originalSetValue = editorInstance.setValue;
    editorInstance.setValue = function(value) {
        isUserModified = false;
        originalSetValue.call(this, value);
        isUserModified = true;
    };

    init();
});

// 组件卸载时解绑事件
onUnmounted(() => {
    // 移除keydown监听
    window.removeEventListener('keydown', handleKeydown);
});

// 导入 watch
import { watch } from 'vue';

function showPlaceholder(value) {
    if (value === '') {
        document.querySelector('.editor-placeholder').style.display = "initial";
    }
}

function hidePlaceholder() {
    document.querySelector('.editor-placeholder').style.display = "none";
}

function createTab() {
    console.info('create new tab');
    if('' == editorInstance.getValue()) {
        console.info('当前页没有内容，不需要创建新tab页');
        return;
    }
    let j = Object.assign({}, tmpJ);
    let id = window.api.sid();
    box.value.tabTitleIndex++;
    box.value.data.push(Object.assign(j, {id: id, title: "NewTab " + box.value.tabTitleIndex}));
    console.info('新建tab后的box==', box);
    switchTab(id);
}

function closeTab() {
    console.info('close current tab');
    if(box.value.data.length === 1) {
        box.value.tabTitleIndex = 0;
        if(box.value.data[0].content === '') {
            console.info('当前只有一个空白页，无法关闭');
            return;
        }
        box.value.data[0].title = 'NewTab 0';
        box.value.data[0].content = '';
        editorInstance.setValue('');
        console.info('关闭后只剩下一个空白页了');
        return;
    }
    let currentId = box.value.activeId;
    for(let i = 0; i < box.value.data.length; i++) {
        if(box.value.data[i].id === currentId) {
            let nextId;
            if(i == 0) {
                nextId = 1;
            } else {
                nextId = i - 1;
            }
            box.value.activeId = box.value.data[nextId].id;
            editorInstance.setValue(box.value.data[nextId].content);
            box.value.data.splice(i, 1);
            break;
        }
    }
    console.info('closeTab后的box==', box);
}

function switchTab(id) {
    let currentId = box.value.activeId;
    console.info('currentId==%s\nnewId====%s', currentId, id);
    console.info('box.value.data=====%o', box.value.data);
    for(let t of box.value.data) {
        // console.info('tttttt==%o', t);
        if(t.id === currentId) {
            t.content = editorInstance.getValue();
            break;
        }
    }
    // console.info('content==%s', editorInstance.getValue());
    for(let t of box.value.data) {
        if(t.id === id) {
            // console.info('t=========%o', t);
            box.value.activeId = t.id;
            editorInstance.setValue(t.content);
            t.content && hidePlaceholder();
            break;
        }
    }
}

function init() {
    const target = box.value.data.find(t => t.id === box.value.activeId);
    if (target) {
        editorInstance.setValue(target.content);
        if (target.content !== '') hidePlaceholder();
    }
}

function openSettings() {
    router.push('/settings');
}

function copy(name) {
    console.info('now copy to clipboard: ', name);
    const handlers = {
        'minify': function(jsonObj) {
            return JSON.stringify(jsonObj);
        },
        'xml': function(jsonObj) {
            var x2js = new X2js({
                useDoubleQuotes: true
            });
            let tmp = x2js.js2xml(jsonObj)
            return FormatXml.formatXml(tmp);
        },
        'yaml': function(jsonObj) {
            return Yaml.j2y(jsonObj);
        }
    };
    const re = handlers[name](JSON.parse(editorInstance.getValue()));
    // console.info(re);
    navigator.clipboard.writeText(re).then(() => {
        console.info(`${name}格式内容复制成功`);
        window.api.notification('复制成功', {body: `${name}格式内容已经复制到剪贴板`});
    }).catch((err) => {
        console.error(err);
        window.api.notification('复制失败', {body: `${name}格式内容复制失败`});
    });
}
</script>

<style scoped>
#container { display: flex; flex-direction:column; width: 100vw; height: 100vh; margin: 0; padding: 0; }
header { background-color: rgb(245, 245, 248);}
main { flex: 1; background-color: #dee2e6; min-height:0;}
footer { background-color: rgb(245, 245, 248);}


.header {
    height:35px;
}
.bottom{
    height:35px; width: 100%;
    display: grid;
    grid-template-columns: 50px auto 300px;
    
}
.btngroup{
    width: 100%; height: 100%; display: flex;

justify-content: flex-end;
}

.icon-span {display:inline-block; width: 40px; height: 35px; text-align: center;
    border-radius: 20px;
    display: table-cell;
    vertical-align:middle;}
.icon {font-size: 20px; }
.icon-span:hover {background-color: hsl(0, 0%, 90%); cursor: pointer;}
.icon-span:active {background-color: hsl(0, 0%, 80%); cursor: pointer;}

.divSettings{
    width: 100%; height: 100%;
    text-align: center;
}

.editor {
    width: 100%;
    height: 100%;
    position: relative;
}
.editor-placeholder {
    display: none;
    position: absolute;
    top: 0;
    left: 65px;
    pointer-events: none;
    z-index: 1;
    opacity: 0.7;
}
</style>