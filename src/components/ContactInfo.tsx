import styles from "./ContactInfo.module.css";
import { useTranslation } from 'react-i18next'

export default function ContactInfo() {
  const { t } = useTranslation()
  return (
    <section>
      <h1>{t('contact.heading', 'CONTACT US')}</h1>
      <h2>{t('contact.tagline', 'We\'d love to hear from you')}</h2>
      <p>
        {t('contact.description', 'Have a question, project idea, or just want to say hi? Send us a message\n        and we\'ll get back to you soon.')}
      </p>
      <address className={styles.addressContainer}>
        <div className={styles.addressItem}>
          <div>★</div>
          <div>
            <p className={styles.addressTitle}>{t('contact.details.email.label', 'Email')}</p>
            {/* i18next-instrument-ignore-next-line */}
            <p>hello@abc.studio</p>
          </div>
        </div>
        <div className={styles.addressItem}>
          <div>★</div>
          <div>
            <p className={styles.addressTitle}>{t('contact.details.phone.label', 'Phone')}</p>
            {/* i18next-instrument-ignore-next-line */}
            <p>+82 10-1234-5678</p>
          </div>
        </div>
        <div className={styles.addressItem}>
          <div>★</div>
          <div>
            <p className={styles.addressTitle}>{t('contact.details.location.label', 'Location')}</p>
            <p>{t('contact.details.location.value', 'Seoul, Republic of Korea')}</p>
          </div>
        </div>
      </address>
    </section>
  );
}
