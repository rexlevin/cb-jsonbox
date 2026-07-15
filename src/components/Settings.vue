<template>
    <div class="settings-overlay" @click.self="$emit('close')">
        <div class="settings-modal">
            <div class="settings-header">
                <span>设置</span>
                <span class="close-btn" @click="$emit('close')">&times;</span>
            </div>
            <el-tabs tab-position="left" class="settings-tabs">
                <el-tab-pane label="快捷键说明">
                    <el-table :data="shortcuts" style="width: 100%">
                        <el-table-column prop="key" label="键" width="180" />
                        <el-table-column prop="description" label="说明" />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="关于">
                    <div class="about-content">
                        <div class="link-item">
                            <span>当前版本：v{{ version }}</span>
                        </div>
                        <div class="link-item">
                            <span>项目主页：</span>
                            <a href="#" @click.prevent="openExternal('https://github.com/rexlevin/cb-jsonbox')">https://github.com/rexlevin/cb-jsonbox</a>
                        </div>
                        <div class="donation">
                            <span>给小可爱买一杯咖啡：</span>
                            <img src="@/assets/payment-qrcode.png" alt="支付二维码" />
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { version } from '../../package.json';

defineEmits(['close']);

function openExternal(url) {
    window.api.openExternal(url);
}

const shortcuts = ref([
    { key: 'Alt+S', description: '打开设置' },
    { key: 'Ctrl+T', description: '新建标签页' },
    { key: 'Ctrl+W', description: '关闭当前标签页' },
    { key: 'Ctrl++', description: '放大界面' },
    { key: 'Ctrl+-', description: '缩小界面' },
    { key: 'Ctrl+0', description: '重置缩放' },
    { key: 'ESC', description: '关闭设置弹层' },
]);
</script>

<style scoped>
.settings-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.settings-modal {
    width: 600px;
    height: 420px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    user-select: none;
}

.settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    font-size: 16px;
    font-weight: 500;
}

.close-btn {
    cursor: pointer;
    font-size: 22px;
    line-height: 1;
    color: #909399;
}

.close-btn:hover {
    color: #409EFF;
}

.settings-tabs {
    flex: 1;
    padding: 0 16px 16px;
    overflow: hidden;
}

:deep(.settings-tabs > .el-tabs__content) {
    height: 100%;
    overflow-y: auto;
}

.about-content {
    padding: 20px;
}

.link-item {
    margin-bottom: 15px;
}

.link-item a {
    color: #409EFF;
    text-decoration: none;
}

.donation {
    margin-top: 20px;
}

.donation img {
    width: 200px;
    height: 200px;
    margin-top: 10px;
}
</style>
