import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllNotes, type IData, type Note } from "@/lib/redis";
import SidebarNoteList from "./SidebarNoteList";

export default async function Sidebar() {
  const notes = await getAllNotes();
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
        <nav>
          <SidebarNoteList notes={notes} />
        </nav>
      </section>
    </>
  );
}
