import i18n, { LanguageDetectorAsyncModule } from "i18next"
import { initReactI18next } from "react-i18next"
import * as Localization from "expo-localization"
import AsyncStorage from "@react-native-async-storage/async-storage"

import en from "./en.json"
import ar from "./ar.json"

const LANGUAGE_KEY = "settings.lang"

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
}

const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      await AsyncStorage.getItem(LANGUAGE_KEY).then((language) => {
        return callback(language ?? Localization.locale)
      })
    } catch (error) {
      console.log("error reading language", error)
    }
  },
  cacheUserLanguage: async function (language: string) {
    // store "language" in AsyncStorage
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language)
    } catch (error) {}
  },
}

i18n.use(initReactI18next).use(languageDetectorPlugin).init({
  resources,
  fallbackLng: "en",
})

export default i18n
