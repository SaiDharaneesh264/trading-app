import App from "./App";
import ReactDOM from "react-dom/client";
import "cors"
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { UserProvider } from "./store/user";
import AuthProvider from "./store/auth";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const callBackUrl = process.env.REACT_APP_CALLBACK_URL as string;
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
