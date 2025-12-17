"use client"; // Must be first line

import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@/redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";

const persistor = persistStore(store)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
           <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <Header />
        {children}
        </ThemeProvider>
        </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
