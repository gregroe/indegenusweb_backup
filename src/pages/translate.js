import { google } from "@google-cloud/translate/build/protos/protos";
export default function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  }