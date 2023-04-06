[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/vtMjwcap)
# hw2-handling-input-events
This is the starter code of [2023-Programming User Interface Homework](https://hackmd.io/@akairisu/HkUibgmx3)

## 姓名
陳君翰

## Deploy 網站連結
https://mellow-alfajores-5b2391.netlify.app

## 設計
### 設計邏輯
基本邏輯由 `selectedTarget`, `draggedTarget` 兩個全域變數控制，他們會儲存被選取到的元素。而每個 event 發生時幾乎都會有條件判斷，確定相應的 `selectedTarget`, `draggedTarget` 存在（有連接到某個element）才能操控，並且在動作結束時將變數變回 `null`
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
沒有特殊設計有趣的東西