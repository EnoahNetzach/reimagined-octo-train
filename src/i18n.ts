import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { assetsHash, basePath } from '~/configs'

export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${basePath.replace(/\/*$/, '')}/locales/{{lng}}.json?t=${assetsHash}`,
    },
    debug: import.meta.env.NODE_ENV !== 'production',
    detection: {
      order: ['querystring', 'navigator', 'path', 'subdomain', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag'],
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    preload: ['en'],
  })
