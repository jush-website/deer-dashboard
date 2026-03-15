import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const DeerDashboard = () => {
  const { unityProvider, sendMessage, isLoaded, progression } = useUnityContext({
    loaderUrl: "Build/UnityBuild.loader.js",
    dataUrl: "Build/UnityBuild.data",
    frameworkUrl: "Build/UnityBuild.framework.js",
    codeUrl: "Build/UnityBuild.wasm",
  });

  // 記錄輸入框的數值
  const [inputValue, setInputValue] = useState(0);
  // 新增一個狀態：用來記錄「是否正在接收預測數據」
  const [isPredicting, setIsPredicting] = useState(false);

  // 原本的手動傳送函式
  const handleSendData = () => {
    sendMessage("DeerModel", "SetAntlerSize", parseFloat(inputValue));
  };

  // 🌟 新增：模擬接收 AI 預測數據的函式
  const simulatePrediction = () => {
    // 1. 開啟載入狀態 (按鈕會顯示運算中)
    setIsPredicting(true);

    // 2. 使用 setTimeout 模擬網路請求延遲 (1.5秒)
    setTimeout(() => {
      // 假設 AI 預測出來的鹿茸生長進度落在 60 到 100 之間
      const predictedValue = Math.floor(Math.random() * 41) + 60; 
      
      // 更新網頁上的輸入框數字
      setInputValue(predictedValue);
      
      // 直接把預測出來的數字丟給 Unity 改變模型長度！
      sendMessage("DeerModel", "SetAntlerSize", predictedValue);
      
      // 關閉載入狀態
      setIsPredicting(false);
    }, 1500); // 1500 毫秒 = 1.5 秒
  };

  return (
    <div style={{ padding: "20px", background: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#2c3e50" }}>🦌 3D 鹿場視覺化元件</h2>
      
      {/* 操作面板 */}
      <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        
        {/* 手動控制區塊 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px", fontWeight: "bold", color: "#333" }}>手動微調 (0-100)：</label>
          <input 
            type="number" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()} // 破解 Unity 攔截鍵盤的問題
            min="0"
            max="100"
            style={{ padding: "8px", width: "100px", marginRight: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button 
            onClick={handleSendData}
            style={{ padding: "8px 15px", cursor: "pointer", background: "#6c757d", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold" }}
          >
            手動同步
          </button>
        </div>

        {/* 🌟 模擬預測控制區塊 */}
        <div style={{ borderTop: "1px solid #dee2e6", paddingTop: "15px" }}>
          <button 
            onClick={simulatePrediction}
            disabled={isPredicting || !isLoaded} // 沒載入完或正在運算時，按鈕不可按
            style={{ 
              padding: "10px 20px", 
              cursor: isPredicting ? "not-allowed" : "pointer", 
              background: isPredicting ? "#ff9800" : "#4CAF50", 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              fontWeight: "bold",
              fontSize: "16px",
              width: "100%",
              transition: "background 0.3s"
            }}
          >
            {isPredicting ? "⏳ AI 模型運算中... 正在接收數據" : "🤖 模擬接收最新 AI 預測數據"}
          </button>
        </div>

      </div>

      <div style={{ border: "2px solid #e0e0e0", width: "100%", maxWidth: "800px", height: "600px", position: "relative", borderRadius: "8px", overflow: "hidden" }}>
        {/* 載入進度條 */}
        {!isLoaded && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: "bold", color: "#666" }}>
            3D 場景載入中... {Math.round(progression * 100)}%
          </div>
        )}
        
        <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

export default DeerDashboard;