import Link from "next/link";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export default function EditButton({
  noteId,
  children,
}: {
  noteId: string | null;
  children: ReactNode;
}) {
  const isDraft = noteId == null;

  return (
    <Link href={`/note/edit/${noteId || ""}`} className="link--unstyled">
      <Button
        variant={isDraft ? "link" : "outline"}
        size="lg"
        className="w-full"
        role="menuitem"
      >
        {children}
      </Button>
    </Link>
  );
}
