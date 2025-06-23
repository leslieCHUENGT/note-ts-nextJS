import { getT } from "@/app/i18n";

export default async function Page() {
  const { t } = await getT();
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("h1")}</span>
    </div>
  );
}
