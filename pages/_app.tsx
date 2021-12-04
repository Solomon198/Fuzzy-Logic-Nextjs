import "../styles/globals.css";
import type { AppProps } from "next/app";
import storeConfig from "../app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const { store, persistor } = storeConfig();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
