import styles from "./ContactInfo.module.css";

export default function ContactInfo() {
  return (
    <section>
      <h1>CONTACT US</h1>
      <h2>We'd love to hear from you</h2>
      <p>
        Have a question, project idea, or just want to say hi? Send us a message
        and we'll get back to you soon.
      </p>
      <address className={styles.addressContainer}>
        <div className={styles.addressItem}>
          <div>★</div>
          <div>
            <p className={styles.addressTitle}>Email</p>
            <p>hello@abc.studio</p>
          </div>
        </div>
        <div className={styles.addressItem}>
          <div>★</div>
          <div>
            <p className={styles.addressTitle}>Phone</p>
            <p>+82 10-1234-5678</p>
          </div>
        </div>
        <div className={styles.addressItem}>
          <div>★</div>
          <div>
            <p className={styles.addressTitle}>Location</p>
            <p>Seoul, Republic of Korea</p>
          </div>
        </div>
      </address>
    </section>
  );
}
