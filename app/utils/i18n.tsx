import languageParser from "accept-language-parser";

import en from "~/translations/en.server";
import nb from "~/translations/nb.server";

const translations = [
  { code: "en", translations: en },
  { code: "nb", translations: nb },
];

const fallbackLanguageCode = translations[0].code;

function getTranslationFromLanguage(language: string): typeof en {
  let translationObj = translations.find((t) => t.code === language);
  !translationObj && (translationObj = translations[0]);

  return translationObj.translations;
}

function supportedLang(preference: string) {
  const isSupportedLanguageObj = translations.find(
    (t) => t.code === preference
  );

  if (!isSupportedLanguageObj) return fallbackLanguageCode;

  return isSupportedLanguageObj.code;
}

function getSystemLanguage(request: Request): string {
  const languageHeaders = request.headers.get("accept-language");

  if (!languageHeaders) return fallbackLanguageCode;

  const appLanguage = languageParser.parse(languageHeaders);
  const preference = appLanguage[0] ?? null;

  if (!preference?.code) return fallbackLanguageCode;

  return supportedLang(preference.code);
}

export async function getLanguage(request: Request): Promise<string> {
  let appLanguage = null;
  !appLanguage && (appLanguage = getSystemLanguage(request));
  return appLanguage;
}

export async function getTranslation(request: Request) {
  const appLanguage = await getLanguage(request);
  return getTranslationFromLanguage(appLanguage);
}
