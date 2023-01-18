import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./theme";
import store from "./store";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
   <ThemeProvider theme={theme}>
      <Provider store={store}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Provider>
   </ThemeProvider>
);
