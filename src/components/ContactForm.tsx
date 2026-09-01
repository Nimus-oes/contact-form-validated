import styles from "./ContactForm.module.css";

export default function ContactForm() {
  return (
    <div>
      <form action="">
        <div className={styles.inputItem}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Your name" />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="phone">Phone (Optional)</label>
          <input id="phone" type="text" placeholder="010-1234-5678" />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="subject">Subject</label>
          <select name="" id="subject">
            <option value="">Select a subject</option>
            <option value="general-inquiry">General inquiry</option>
            <option value="project-inquiry">Project inquiry</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="message">Message</label>
          <textarea
            name=""
            id="message"
            placeholder="Tell us about your project or inquiry..."
          ></textarea>
        </div>
        <div className={styles.checkItem}>
          <input id="contact-consent" type="checkbox" />
          <label htmlFor="contact-consent">
            I consent to being contacted by the team
          </label>
        </div>
        <div>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </div>
  );
}
