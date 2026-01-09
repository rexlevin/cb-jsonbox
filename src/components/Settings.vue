<template>
    <div class="settings-container">
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
                        <span>项目主页：</span>
                        <a href="https://gitee.com/lizl6/cb-jsonbox" target="_blank">https://gitee.com/lizl6/cb-jsonbox</a>
                    </div>
                    <div class="link-item">
                        <span>代码仓库：</span>
                        <a href="https://gitee.com/lizl6/cb-jsonbox-pages" target="_blank">https://gitee.com/lizl6/cb-jsonbox-pages</a>
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
import { ref } from 'vue';

const saveSession = ref(false);
const restoreWindowState = ref(false);
const shortcuts = ref([
    { key: 'Ctrl+T', description: '新建标签页' },
    { key: 'Ctrl+W', description: '关闭当前标签页' },
]);
</script>

<style scoped>
.settings-container {
    height: 100%;
    user-select:none;
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