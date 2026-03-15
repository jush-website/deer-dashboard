import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

// 宣告一個獨立的 React 元件
const DeerDashboard = () => {
  // 1. 設定 Unity 檔案的讀取路徑 (請再次確認檔名沒有 .br)
  const { unityProvider, sendMessage, isLoaded, progression } = useUnityContext({
    loaderUrl: "Build/UnityBuild.loader.js",
    dataUrl: "Build/UnityBuild.data",
    frameworkUrl: "Build/UnityBuild.framework.js",
    codeUrl: "Build/UnityBuild.wasm",
  });

  // 2. 建立 React 狀態 (State)
  const [inputValue, setInputValue] = useState(0);

  // 3. 傳送數據給 Unity 的函式
  const handleSendData = () => {
    sendMessage("DeerModel", "SetAntlerSize", parseFloat(inputValue));
  };

  return (
    <div style={{ padding: "20px", background: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#2c3e50" }}>🦌 3D 鹿場視覺化元件</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>預測鹿茸生長進度 (0-100)：</label>
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          min="0"
          max="100"
          style={{ padding: "8px", width: "100px", marginRight: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button 
          onClick={handleSendData}
          style={{ padding: "8px 15px", cursor: "pointer", background: "#4CAF50", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold" }}
        >
          傳送同步指令
        </button>
      </div>

      <div style={{ border: "2px solid #e0e0e0", width: "100%", maxWidth: "800px", height: "600px", position: "relative", borderRadius: "8px", overflow: "hidden" }}>
        {/* 載入進度條 */}
        {!isLoaded && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: "bold", color: "#666" }}>
            3D 場景載入中... {Math.round(progression * 100)}%
          </div>
        )}
        
        {/* Unity 畫面 */}
        <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

// 將這個元件匯出，讓其他檔案可以使用
export default DeerDashboard;