import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { GoogleOAuthProvider } from "@react-oauth/google"
import store from "./config/store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <React.Suspense fallback={<span>Loading ...</span>}>
        <GoogleOAuthProvider clientId="387752906810-bhifa1qvjqa3f1pat2q9li5r8vifvh1u.apps.googleusercontent.com">
          <Provider store={store}>
            <App />
          </Provider>
        </GoogleOAuthProvider>
      </React.Suspense>
    </React.StrictMode>
  </BrowserRouter>,
)

reportWebVitals()
