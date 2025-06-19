import { type IData, type Note } from "@/lib/redis";
import dayjs from "dayjs";
import SidebarNoteItemContent from "./SidebarNoteItemContent";

export default async function SidebarNoteList({ notes }: { notes: Note }) {
  const noteList = Object.entries(notes);

  if (noteList.length === 0) {
    return <div className="notes-empty">No notes created yet!</div>;
  }

  return (
    <ul className="notes-list">
      {noteList.map(([noteId, note]) => {
        const { title, updateTime } = JSON.parse(note);
        return (
          <li key={noteId}>
            <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
          </li>
        );
      })}
    </ul>
  );
}

function SidebarNoteItem({ noteId, note }: { noteId: string; note: IData }) {
  const { title, content = "", updateTime } = note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <header className="sidebar-note-header">
        <strong>{title}</strong>
        <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
      </header>
    </SidebarNoteItemContent>
  );
}
