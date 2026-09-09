import en from "./en.json";
import ar from "./ar.json";

export type Locale = "en" | "ar";

export const messages: Record<Locale, Record<string, string>> = { en, ar };

export const RTL_LOCALES: Locale[] = ["ar"];
