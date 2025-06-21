import { getAllNotes, type IData, type Note } from "@/lib/redis";
import dayjs from "dayjs";
import SidebarNoteItemContent from "./SidebarNoteItemContent";

export default async function SidebarNoteList() {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  // await sleep(2000);

  const notes = await getAllNotes();

  const noteList = Object.entries(notes);

  if (noteList.length === 0) {
    return <div className="notes-empty">No notes created yet!</div>;
  }

  return (
    <ul className="notes-list">
      {noteList.map(([noteId, note]) => {
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
    // 在服务端组件里进行 dayjs的使用和 以props形式传递，客户端代码中则不会有该类库的代码，可看第一个 html的内容
    // 服务端组件可以导入客户端组件，但客户端组件并不能导入服务端组件
    // 从服务端组件到客户端组件传递的数据需要   **可序列化** jsx可正常传递 、function不支持传递

    // 尽可能将客户端组件在组件树中下移
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
