import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import styles from "./App.module.css";

export default function App() {
  return (
    <main className={styles.mainContainer}>
      <ContactInfo />
      <ContactForm />
    </main>
  );
}
