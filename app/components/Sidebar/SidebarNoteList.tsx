import { getAllNotes, type IData, type Note } from "@/lib/redis";
import SidebarNoteItemHeader from "./SidebarNoteItemHeader";
import SidebarNoteListFilter from "./SidebarNoteListFilter";

export default async function SidebarNoteList() {
  const notes = await getAllNotes();

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
}
