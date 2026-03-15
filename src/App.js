import React from "react";
import DeerDashboard from "./components/DeerDashboard"; // 引入我們剛剛做的元件
import "./App.css"; 

function App() {
  return (
    <div style={{ backgroundColor: "#f4f7f6", minHeight: "100vh", padding: "40px" }}>
      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1 style={{ color: "#2c3e50", margin: "0" }}>智慧農業：水鹿養殖戰情室</h1>
        <p style={{ color: "#7f8c8d", marginTop: "5px" }}>結合 IoT 感測器與 3D 數位雙生技術</p>
      </header>

      <main style={{ display: "flex", justifyContent: "center" }}>
        {/* 這裡就像放積木一樣，把 3D 畫面放進來！ */}
        <DeerDashboard />
        
      </main>
    </div>
  );
}

export default App;