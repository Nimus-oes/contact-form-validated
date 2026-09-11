import { useEffect, useRef, useState } from "react";
import { DEFAULT_FORM_VALUES, type ContactFormValues } from "../models";
import styles from "./ContactForm.module.css";
import SubjectSelect from "./SubjectSelect";
import { Controller, useForm } from "react-hook-form";

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const successTitleRef = useRef<HTMLHeadingElement>(null);
  const wasSuccess = useRef(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: DEFAULT_FORM_VALUES,
    shouldFocusError: true,
  });

  useEffect(() => {
    if (isSuccess) {
      successTitleRef.current?.focus();
    } else if (wasSuccess.current) {
      setFocus("name");
    }

    wasSuccess.current = isSuccess;
  }, [isSuccess, setFocus]);

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
      <section aria-labelledby="success-title">
        <h2 id="success-title" ref={successTitleRef} tabIndex={-1}>
          Message Sent!
        </h2>
        <p>Thanks for reaching out.</p>
        <p>We'll get back to you as soon as possible.</p>
        <button type="button" onClick={handleWriteAgain}>
          Send another message
        </button>
      </section>
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
              required: "Please enter your name",
              maxLength: {
                value: 50,
                message: "Name cannot exceed 50 characters",
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
              required: "Please enter your email address",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
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
            rules={{ required: "Please select a subject" }}
            render={({ field }) => (
              <SubjectSelect
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                triggerRef={field.ref}
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
              required: "Please enter a message",
              maxLength: {
                value: 1000,
                message: "Message cannot exceed 1,000 characters",
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
              required: "You must consent to being contacted by the team",
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
