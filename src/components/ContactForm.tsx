import type { ContactFormValues } from "../models";
import styles from "./ContactForm.module.css";
import SubjectSelect from "./SubjectSelect";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const handleFormData = (data: ContactFormValues) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormData)}>
        <div className={styles.inputItem}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            {...register("name", {
              required: "이름을 입력하세요",
              maxLength: {
                value: 50,
                message: "이름은 50자를 초과할 수 없습니다",
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="phone">Phone (Optional)</label>
          <input
            id="phone"
            type="text"
            placeholder="010-1234-5678"
            {...register("phone")}
          />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="subject">Subject</label>
          <SubjectSelect />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Tell us about your project or inquiry..."
            {...register("message")}
          ></textarea>
        </div>
        <div className={styles.checkItem}>
          <input
            id="contact-consent"
            type="checkbox"
            {...register("contactConsent")}
          />
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
