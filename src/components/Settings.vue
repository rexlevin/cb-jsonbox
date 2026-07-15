<template>
    <div class="settings-container">
        <div class="settings-header">
            <el-button text @click="back">&larr; 返回</el-button>
        </div>
        <el-tabs tab-position="left" class="settings-tabs">
            <!-- <el-tab-pane label="常用">
                <div class="common-settings">
                    <el-checkbox v-model="saveSession">保存会话</el-checkbox>
                    <el-checkbox v-model="restoreWindowState">恢复上次关闭时窗口位置和大小</el-checkbox>
                </div>
            </el-tab-pane> -->
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
                        <a href="https://gitee.com/lizl6/cb-jsonbox" target="_blank">https://gitee.com/lizl6/cb-jsonbox</a>
                    </div>
                    <div class="donation">
                        <span>给小可爱买一杯咖啡：</span>
                        <img src="@/assets/payment-qrcode.png" alt="支付二维码" />
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { version } from '../../package.json';

const router = useRouter();

function back() {
    router.push('/');
}

// ESC 返回主界面
const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        back();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
});

const shortcuts = ref([
    { key: 'Alt+S', description: '打开设置页' },
    { key: 'Ctrl+T', description: '新建标签页' },
    { key: 'Ctrl+W', description: '关闭当前标签页' },
    { key: 'Ctrl++', description: '放大界面' },
    { key: 'Ctrl+-', description: '缩小界面' },
    { key: 'Ctrl+0', description: '重置缩放' },
    { key: 'ESC', description: '设置页中返回主界面' },
]);
</script>

<style scoped>
.settings-container {
    height: 100%;
    user-select:none;
}

.settings-header {
    padding: 8px 12px;
    border-bottom: 1px solid var(--el-border-color-lighter);
}

.settings-tabs {
    height: 100%;
}

.el-tab-pane {
    height: calc(100%);
    overflow-y: auto;
}

.about-content {
    padding: 20px;
    max-height: 400px;
    overflow-y: auto;
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