import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
  translation: {
    dashboard: "Dashboard",
    market: "Market",
    analytics: "Analytics",
    schemes: "Govt Schemes",
    settings: "Settings",
    welcome: "Welcome",
    logout: "Logout",
  },
},
hi: {
  translation: {
    dashboard: "डैशबोर्ड",
    market: "बाजार",
    analytics: "विश्लेषण",
    schemes: "सरकारी योजनाएं",
    settings: "सेटिंग्स",
    welcome: "स्वागत है",
    logout: "लॉग आउट",
  },
},
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;