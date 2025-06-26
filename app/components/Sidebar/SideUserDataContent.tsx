"use client";
import { useT } from "@/app/i18n/client";
import { useAppStore } from "@/context/appStoreProvider";

export default function SideUserDataContent() {
  const { t } = useT();
  const userData = useAppStore((store) => store.userProfile);
  return (
    <div className="nick-name">
      <span>{t("h1")}</span>
      <span className="name">{userData.nickName}</span>
    </div>
  );
}
