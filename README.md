[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/vtMjwcap)

# hw2-handling-input-events

This is the starter code of [2023-Programming User Interface Homework](https://hackmd.io/@akairisu/HkUibgmx3)

## 姓名

陳君翰

## Deploy 網站連結

https://mellow-alfajores-5b2391.netlify.app

## 設計

### 設計邏輯

使用 state patter 來設計，由 Context 來管理所有資源，而有多種 State 供 Context 轉換，在不同的 State 之下會有不同的功能

值得注意的是，每次 State 開啟和關閉時都會需要添加、去除 event listener，而在過程中 `function.bind()` 會是一個能夠讓函式呼叫更為穩定的方法

### 已完成

mouse, keyboard event 相關功能

- 滑鼠點擊選取
- 滑鼠點擊背景取消選取
- 滑鼠長按移動
- 滑鼠雙擊移動
- 鍵盤 ESC 取消行為

### 未完成

touch event 相關功能

## 加分項目

無實作加分項目

## 有趣之處

不知道為什麼，如果在切換 state 之前沒有好好移除 event listener，拖曳的時候就很容易爆衝離滑鼠很遠的地方
