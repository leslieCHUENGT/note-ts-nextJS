import { type IData, type Note } from "@/lib/redis";

export default async function SidebarNoteList({ notes }: { notes: Note }) {
  const noteList = Object.entries(notes);

  console.log(noteList);

  if (noteList.length === 0) {
    return <div className="notes-empty">No notes created yet!</div>;
  }

  return (
    <ul className="notes-list">
      {noteList.map(([noteId, note]) => {
        const { title, updateTime } = JSON.parse(note);
        return (
          <li key={noteId}>
            <header className="sidebar-note-header">
              <strong>{title}</strong>
              <small>{updateTime}</small>
            </header>
          </li>
        );
      })}
    </ul>
  );
}
