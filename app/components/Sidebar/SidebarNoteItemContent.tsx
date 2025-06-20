"use client";

import {
  useState,
  useRef,
  useEffect,
  useTransition,
  type ReactNode,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SidebarNoteContentProps {
  id: string;
  title: string;
  children: ReactNode;
  expandedChildren: ReactNode;
}

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren,
}: SidebarNoteContentProps) {
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef<string>(title); // 用于存储该组件的标题

  // 打开笔记的处理函数
  const handleOpenNote = () => {
    router.push(`/note/${id}`);
  };

  // 切换展开状态的处理函数
  const handleToggleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // 切换时增加过渡效果
  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      if (itemRef.current) {
        itemRef.current.classList.add("flash");
      }
    }
    console.log(title);
  }, [title]);

  // 动画结束移除效果
  const handleAnimationEnd = () => {
    itemRef.current?.classList.remove("flash");
  };

  return (
    <div
      ref={itemRef}
      onAnimationEnd={handleAnimationEnd}
      className={[
        "sidebar-note-list-item",
        isExpanded ? "note-expanded" : "",
      ].join(" ")}
    >
      {children}
      <button className="sidebar-note-open" onClick={handleOpenNote}>
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={handleToggleExpand}
      >
        {isExpanded ? (
          <Image
            src="/chevron-down.svg"
            width="10"
            height="10"
            alt="Collapse"
          />
        ) : (
          <Image src="/chevron-up.svg" width="10" height="10" alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
}
