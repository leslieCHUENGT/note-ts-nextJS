import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from "./SidebarNoteList";
import EditButton from "./EditButton";
import SidebarNoteListSkeleton from "./SidebarNoteListSkeleton";

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/logo.svg"
              width={22}
              height={22}
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          {/* 使用 Suspense，数据加载不会阻塞页面 */}
          {/* 等待的时间中一直保持连接（流式接口），后续通过 streaming传输 */}
          {/* 使用 Suspense 和 Streaming 不用担心会对 SEO 造成影响 */}
          <Suspense fallback={<SidebarNoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
