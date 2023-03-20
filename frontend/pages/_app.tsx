import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import cx from "classnames";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";
import { Web3Provider, Web3Consumer } from "context";

const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <RWBProvider>
        <Web3Provider>
          <Web3Consumer>
           {
              () => {
                return (
                  <div className={cx(sfPro.variable, inter.variable)}>
                    <Component {...pageProps} />
                  </div>
                )
              }
            }
          </Web3Consumer>
        </Web3Provider>
      </RWBProvider>
      <Analytics />
    </SessionProvider>
  );
}
