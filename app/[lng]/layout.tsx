import "./style.css";
import { ReactNode } from "react";
import Sidebar from "@/app/components/Sidebar/index";
import Footer from "@/app/components/Footer";

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lng: string };
}) {
  const { lng } = await params;
  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <div className="main">
            <Sidebar lng={lng} />
            <section className="col note-viewer">{children}</section>
          </div>
          <Footer lng={lng} />
        </div>
      </body>
    </html>
  );
}
