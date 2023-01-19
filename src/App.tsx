import AppRoutes from "./AppRoutes";
import theme from "./theme";
import store from "./store";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const App = () => (
   <ThemeProvider theme={theme}>
      <Provider store={store}>
         <BrowserRouter>
            <AppRoutes />
         </BrowserRouter>
      </Provider>
   </ThemeProvider>
);

export default App;
