import { createRoot } from "react-dom/client";
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import App from "./App";
import Signin from "./pages/Auth";
import Home from "./pages/Home";
import I18nProvider from "./labs/i18n/I18nProvider";
import { ThemeProvider } from "@strapi/design-system/ThemeProvider";
import { lightTheme } from "@strapi/design-system/themes";
import store from "./store";
import "./helpers/polyfill";
import "./less/global.less";
import "./css/index.css";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

export const history = createBrowserHistory({ window });

root.render(
  <I18nProvider>
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <HistoryRouter history={history}>
          <App>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/u/*" element={<Home />} />
            </Routes>
          </App>
        </HistoryRouter>
      </ThemeProvider>
    </Provider>
  </I18nProvider>
);
