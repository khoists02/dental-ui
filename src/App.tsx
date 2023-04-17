import React from "react"
import { Header } from "./components/parts/Header"
import { Sidebar } from "./components/parts/Sidebar"
import { AppRoutes } from "./routes"
import "./style.scss"

function App() {
  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className="app-page-title"></div>
            <div className="content">
              <AppRoutes />
            </div>
          </div>
          <div className="app-wrapper-footer">
            <div className="app-footer"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
