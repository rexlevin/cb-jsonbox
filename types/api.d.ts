// 定义 window.api 的类型（新架构，canbox-core IPC 通道）
export {}; // 确保文件被识别为模块
declare global {
    interface Window {
        api: {
            /**
             * 发送系统通知
             * @param title - 通知标题
             * @param opt - 通知选项（body 为正文）
             */
            notification: (title: string, opt?: { body?: string }) => void;

            /**
             * 保存会话数据（JSON 字符串）
             * @param box - JSON.stringify 后的会话数据
             * @returns Promise<void>
             */
            saveBox: (box: string) => Promise<void>;

            /**
             * 读取会话数据
             * @param callback - 回调，参数为会话 JSON 字符串或 null
             */
            getBox: (callback: (box: string | null) => void) => void;

            /**
             * 生成 8 位短 id
             * @returns string
             */
            sid: () => string;
        };
    }
}
