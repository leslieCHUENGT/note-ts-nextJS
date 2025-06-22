import { type IData } from "@/lib/redis";
import dayjs from "dayjs";
import NotePreview from "@/app/components/NotePreview";
import EditButton from "@/app/components/EditButton";

export default function Note({
  noteId,
  note,
}: {
  noteId: string;
  note: IData;
}) {
  const { title, content, updateTime } = note;

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            Last updated on {dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}
          </small>
          <EditButton noteId={noteId}>Edit</EditButton>
        </div>
      </div>
      <NotePreview content={content} />
    </div>
  );
}
