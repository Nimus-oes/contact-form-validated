import styles from "./ContactInfo.module.css";
import { useTranslation } from "react-i18next";

export default function ContactInfo() {
  const { t } = useTranslation();
  return (
    <section className={styles.info}>
      <h1 className={styles.eyebrow}>{t("contact.heading", "문의하기")}</h1>
      <h2 className={styles.heading}>
        {t("contact.tagline", "무엇이든 물어보세요")}
      </h2>
      <p className={styles.description}>
        {t(
          "contact.description",
          "궁금한 점이나 프로젝트 아이디어가 있으신가요? 메시지를 보내주시면 곧 답변드리겠습니다.",
        )}
      </p>
      <address className={styles.addressContainer}>
        <div className={styles.addressItem}>
          <div className={styles.iconBox}>
            <div>✉️</div>
          </div>
          <div>
            <p className={styles.addressTitle}>
              {t("contact.details.email.label", "이메일")}
            </p>
            {/* i18next-instrument-ignore-next-line */}
            <p>hello@abc.studio</p>
          </div>
        </div>
        <div className={styles.addressItem}>
          <div className={styles.iconBox}>
            <div>📞</div>
          </div>
          <div>
            <p className={styles.addressTitle}>
              {t("contact.details.phone.label", "전화번호")}
            </p>
            {/* i18next-instrument-ignore-next-line */}
            <p>+82 10-1234-5678</p>
          </div>
        </div>
        <div className={styles.addressItem}>
          <div className={styles.iconBox}>
            <div>📍</div>
          </div>
          <div>
            <p className={styles.addressTitle}>
              {t("contact.details.location.label", "위치")}
            </p>
            <p>{t("contact.details.location.value", "대한민국 서울")}</p>
          </div>
        </div>
      </address>
    </section>
  );
}
