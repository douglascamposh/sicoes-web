'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "@/redux/store";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopMenu from "@/components/topMenu";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Sicoes web</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
            <TopMenu/>
          <div className="pt-[20px] ">{children}</div>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
