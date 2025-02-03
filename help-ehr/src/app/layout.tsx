"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/redux/store";
import "./globals.css";
import { apolloClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
              <main>{children}</main>
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </body>
    </html>
  );
}
