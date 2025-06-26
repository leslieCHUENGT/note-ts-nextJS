import "./style.css";
import { ReactNode } from "react";
import Sidebar from "@/app/components/Sidebar/index";
import Footer from "@/app/components/Footer/index";
import { dir } from "i18next";
import { languages } from "@/app/i18n/settings";
import { AppStoreProvider } from "@/context/appStoreProvider";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lng: string };
}) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <AppStoreProvider>
          <div className="container">
            <div className="main">
              <Sidebar />
              <section className="col note-viewer">{children}</section>
            </div>
            <Footer />
          </div>
        </AppStoreProvider>
      </body>
    </html>
  );
}
