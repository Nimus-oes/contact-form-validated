import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import styles from "./App.module.css";
import LanguageSelector from "./components/LanguageSelector";

export default function App() {
  return (
    <main className={styles.main}>
      <LanguageSelector />
      <div className={styles.container}>
        <ContactInfo />
        <ContactForm />
      </div>
    </main>
  );
}
