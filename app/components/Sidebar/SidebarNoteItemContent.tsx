"use client";

import {
  useState,
  useRef,
  useEffect,
  useTransition,
  type ReactNode,
} from "react";

import { useRouter, usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const selectedId = pathname?.split("/")[1] || null;

  const [isPending] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === selectedId;

  const itemRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef(title);

  // 处理标题变更的动画效果
  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      if (itemRef.current) {
        itemRef.current.classList.add("flash");
      }
    }
  }, [title]);

  // 动画结束后的处理
  const handleAnimationEnd = () => {
    itemRef.current?.classList.remove("flash");
  };

  // 打开笔记的处理函数
  const handleOpenNote = () => {
    const sidebarToggle = document.getElementById(
      "sidebar-toggle"
    ) as HTMLInputElement | null;
    if (sidebarToggle) {
      sidebarToggle.checked = true;
    }
    router.push(`/note/${id}`);
  };

  // 切换展开状态的处理函数
  const handleToggleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // 计算按钮样式
  const getButtonStyles = () => {
    return {
      backgroundColor: isPending
        ? "var(--gray-80)"
        : isActive
        ? "var(--tertiary-blue)"
        : "",
      border: isActive
        ? "1px solid var(--primary-border)"
        : "1px solid transparent",
    };
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
      <button
        className="sidebar-note-open"
        style={getButtonStyles()}
        onClick={handleOpenNote}
      >
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={handleToggleExpand}
      >
        {isExpanded ? (
          <img
            src="/chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
}
