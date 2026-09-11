import { useState } from "react";
import { DEFAULT_FORM_VALUES, type ContactFormValues } from "../models";
import styles from "./ContactForm.module.css";
import SubjectSelect from "./SubjectSelect";
import { Controller, useForm } from "react-hook-form";

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const handleFormData = (data: ContactFormValues) => {
    console.log(data);
    setIsSuccess(true);
  };

  const handleWriteAgain = () => {
    reset();
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div>
        <h2>Message Sent!</h2>
        <p>Thanks for reaching out.</p>
        <p>We'll get back to you as soon as possible.</p>
        <button type="button" onClick={handleWriteAgain}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div>
      <form noValidate onSubmit={handleSubmit(handleFormData)}>
        <div className={styles.inputItem}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            {...register("name", {
              onBlur: (event) => {
                setValue("name", event.target.value.trim(), {
                  shouldDirty: true,
                });
              },
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
            {...register("email", {
              onBlur: (event) => {
                setValue("email", event.target.value.trim(), {
                  shouldDirty: true,
                });
              },
              required: "이메일을 입력하세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "이메일 형식이 올바르지 않습니다",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
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
          <Controller
            name="subject"
            control={control}
            rules={{ required: "문의 유형을 선택하세요" }}
            render={({ field }) => (
              <SubjectSelect
                value={field.value}
                onValueChange={field.onChange}
                name={field.name}
              />
            )}
          />
          {errors.subject && <p>{errors.subject.message}</p>}
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Tell us about your project or inquiry..."
            {...register("message", {
              onBlur: (event) => {
                setValue("message", event.target.value.trim(), {
                  shouldDirty: true,
                });
              },
              required: "메시지를 입력하세요",
              maxLength: {
                value: 1000,
                message: "메시지는 1000자를 초과할 수 없습니다",
              },
            })}
          ></textarea>
          {errors.message && <p>{errors.message.message}</p>}
        </div>
        <div className={styles.checkItem}>
          <input
            id="contact-consent"
            type="checkbox"
            {...register("contactConsent", {
              required: "연락에 동의해야 합니다",
            })}
          />
          <label htmlFor="contact-consent">
            I consent to being contacted by the team
          </label>
          {errors.contactConsent && <p>{errors.contactConsent.message}</p>}
        </div>
        <div>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </div>
  );
}
