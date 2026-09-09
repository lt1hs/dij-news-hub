import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, useT } from "@/i18n/LanguageProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const t = useT();

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLocale}
      title={t("language.toggleLabel")}
      aria-label={t("language.toggleLabel")}
      data-testid="button-language-toggle"
    >
      <div className="relative flex items-center justify-center">
        <Languages className="w-5 h-5" />
        <span className="absolute -bottom-1.5 -end-1.5 text-[8px] font-bold leading-none bg-sidebar-primary text-white rounded px-0.5">
          {locale.toUpperCase()}
        </span>
      </div>
    </Button>
  );
}
