# jsonbox

![logo_128x128.png](logo_128x128.png)

这是canbox平台的小程序，使用 monaco editor 作为json编辑器

有json格式化、页内搜索、转yaml/xml、会话缓存

# 开发

- 启动开发服务器：
  ```bash
  npm run dev
  ```
- 调试主进程：
  ```bash
  npm run start
  ```

# 数据说明

box数据结构：

```json
{
    "activeId": "BRLHF726",
    "tabTitleIndex": 0,
    "data": [
        {
            "id": "BRLHF726",
            "type": 0,
            "title": "NewTab 0",
            "path": "",
            "content": "{}"
        },
        {
            "id": "M8HE47HB",
            "type": 0,
            "title": "NewTab 1",
            "path": "",
            "content": "{}"
        }
    ]
}
```

# 许可证

Apache 2.0