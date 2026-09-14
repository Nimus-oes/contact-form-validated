import styles from "./LanguageSelector.module.css";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { t } = useTranslation();
  return (
    <fieldset className={styles.container}>
      <legend className={styles.visuallyHidden}>
        {t("languageSelector.label", "Select a language")}
      </legend>
      <div aria-hidden="true">🌏</div>
      <input
        id="language-ko"
        type="radio"
        name="languages"
        value="한국어"
        className={styles.visuallyHidden}
      />
      <label htmlFor="language-ko">한국어</label>
      <input
        id="language-en"
        type="radio"
        name="languages"
        value="English"
        className={styles.visuallyHidden}
      />
      <label htmlFor="language-en">English</label>
    </fieldset>
  );
}
