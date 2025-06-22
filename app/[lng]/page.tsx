import { useTranslation } from "@/app/i18n/index";

export default async function Page({ params }: { params: { lng: string } }) {
  const { lng } = await params;
  const { t } = await useTranslation(lng);
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("initText")}</span>
    </div>
  );
}
