import type { ChangeEvent } from "react";
import styles from "./LanguageSelector.module.css";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const changeLang = (event: ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.currentTarget.value);
    localStorage.setItem("appLanguage", event.currentTarget.value);
  };

  return (
    <fieldset className={styles.container}>
      <legend className={styles.visuallyHidden}>
        {t("languageSelector.label", "언어 선택")}
      </legend>
      <div aria-hidden="true">🌏</div>
      <input
        id="language-ko"
        type="radio"
        name="languages"
        value="ko"
        className={styles.visuallyHidden}
        onChange={changeLang}
      />
      <label htmlFor="language-ko">한국어</label>
      <input
        id="language-en"
        type="radio"
        name="languages"
        value="en"
        className={styles.visuallyHidden}
        onChange={changeLang}
      />
      <label htmlFor="language-en">English</label>
    </fieldset>
  );
}
