# JSONBox

![logo_128x128.png](logo_128x128.png)

[中文](./README_CN.md)

JSONBox is a JSON formatting tool running on the **Canbox** desktop application platform. Built on Monaco Editor, it provides professional JSON editing, formatting, search & replace, and JSON ↔ YAML / XML conversion capabilities, delivering ultimate efficiency for developers in their daily JSON data processing.

---

## Table of Contents

- [About JSONBox](#about-jsonbox)
- [About Canbox](#about-canbox)
- [UI Overview](#ui-overview)
- [Get & Install](#get--install)
- [User Guide](#user-guide)
- [License](#license)

---

## About JSONBox

JSONBox is designed for developers who frequently work with JSON, addressing the following pain points:

- **Format & Validate** — One-click beautify/minify JSON, with real-time syntax highlighting and error hints.
- **Format Conversion** — Supports JSON ↔ YAML and JSON ↔ XML quick conversion, no more online tools.
- **Multi-tab Management** — Open multiple JSON documents simultaneously, switch freely between tabs, content auto-saved.
- **Session Recovery** — Automatically remembers tabs, content, and window position after closing, seamlessly resumes on next launch.
- **Keyboard Shortcuts** — Built-in shortcuts like Ctrl+T for new tab, Ctrl+W to close current tab, and more.

### Key Features

| Feature           | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| JSON Formatting   | One-click beautify & minify JSON, with error locating      |
| Format Conversion | JSON → YAML, JSON → XML, results copied in one click       |
| Search & Replace  | Powerful in-page search/replace powered by Monaco Editor   |
| Multi-tab         | Edit multiple documents simultaneously, flexible tab management |
| Session Persistence | Auto-save sessions, restore window position and size     |
| Shortcuts         | Built-in common keyboard shortcuts for better efficiency   |

---

## About Canbox

Canbox is a lightweight desktop toolset platform where users can install and use various "mini-apps" to enrich their desktop workflow.

> Learn more: [https://rexlevin.github.io/canbox-pages/](https://rexlevin.github.io/canbox-pages/)

- **Lightweight** — Each mini-app is small in size, install on demand.
- **Ready to Use** — No complex configuration required, enjoy a smooth desktop experience.
- **Rich Ecosystem** — Covers development tools, text processing, productivity utilities, and more.

JSONBox is the JSON processing mini-app in the Canbox ecosystem, built for developers.

---

## UI Overview

### Main Window

The main window features a tabbed layout: a multi-tab bar at the top, the Monaco Editor workspace in the center, and a status bar at the bottom.

![main.png](./public/screenshots/main.png)

### Tab Management

Create and close tabs as needed. Tab titles auto-increment on creation. Click any tab to switch editing content — each tab independently stores its own JSON data.

### JSON Formatting

Select the JSON content you want to format, and use the toolbar button to beautify or minify it in one click. The editor displays the formatted result in real time.

![format_1.png](./public/screenshots/format_1.png)
![format_2.png](./public/screenshots/format_2.png)

### Format Conversion

Convert JSON content to YAML or XML format. The converted result is automatically copied to the clipboard, with a system notification to confirm.

![to_yaml.png](./public/screenshots/to_yaml.png)

### Search & Replace

Press Ctrl+F to open the search panel. It supports advanced search options such as regex matching, case sensitivity, and whole-word matching.

![search.png](./public/screenshots/search.png)
![replace.png](./public/screenshots/replace.png)

### Settings Page

A left-side menu with right-side content layout, including general settings, keyboard shortcuts reference, and about info.

![hotkey.png](./public/screenshots/hotkey.png)

![about.png](./public/screenshots/about.png)

---

## Get & Install

### Prerequisites

- The **Canbox** desktop platform client must be installed.

### Installation Steps

1. Open the Canbox client.
2. Go to the mini-app marketplace or local install entry.
3. Search for **JSONBox** and click install.
4. After installation, launch JSONBox by clicking its icon on the Canbox home screen.

> If you don't have the Canbox client yet, please obtain and install the Canbox platform first before installing JSONBox.

---

## User Guide

### Quick Start

1. **Launch the App** — Click the JSONBox icon on the Canbox home screen.
2. **Create a Tab** — Press `Ctrl+T` to create a new tab, then input or paste JSON content in the editor.
3. **Format JSON** — Use the toolbar button or shortcut to format in one click.
4. **Format Conversion** — Use the toolbar menu to convert JSON to YAML or XML and copy.
5. **Search & Replace** — Press `Ctrl+F` to open the search panel, enter keywords to search or replace.

### Keyboard Shortcuts

| Shortcut   | Function           |
| ---------- | ------------------ |
| `Ctrl+T` | New tab            |
| `Ctrl+W` | Close current tab  |

> For more shortcuts, check "Settings → Keyboard Shortcuts" within the app.

### Settings

Open the settings page from the top-right corner of the app to configure:

- **Save Session** — When enabled, all tabs and their content are automatically saved on exit.
- **Restore Window Position and Size** — When enabled, the previous window state is restored on next launch.

---

## License

Apache 2.0
