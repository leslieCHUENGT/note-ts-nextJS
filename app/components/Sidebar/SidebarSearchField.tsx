// components/SidebarSearchField.js
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useT } from "@/app/i18n/client";

function Spinner({ active = true }) {
  return (
    <div
      className={["spinner", active && "spinner--active"].join(" ")}
      role="progressbar"
      aria-busy={active ? "true" : "false"}
    />
  );
}

export default function SidebarSearchField() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { t } = useT("client-page");

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder={t("search")}
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
}
