import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { store } from "./store";
import "./styles/toast.scss";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
            <Toaster 
                position="top-center"
                containerClassName="toast-container"
                toastOptions={{
                    duration: 3000,
                    className: 'custom-toast'
                }}
            />
        </Provider>
    </StrictMode>,
);
