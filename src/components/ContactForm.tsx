import { useEffect, useRef, useState } from "react";
import { DEFAULT_FORM_VALUES, type ContactFormValues } from "../models";
import styles from "./ContactForm.module.css";
import SubjectSelect from "./SubjectSelect";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next'

export default function ContactForm() {
  const { t } = useTranslation()
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
          {t('success.title', 'Message Sent!')}
        </h2>
        <p>{t('success.thanks', 'Thanks for reaching out.')}</p>
        <p>{t('success.description', 'We\'ll get back to you as soon as possible.')}</p>
        <button type="button" onClick={handleWriteAgain}>
          {t('success.actions.writeAgain', 'Send another message')}
        </button>
      </section>
    );
  }

  return (
    <div>
      <form noValidate onSubmit={handleSubmit(handleFormData)}>
        <div className={styles.inputItem}>
          <label htmlFor="name">{t('form.fields.name.label', 'Name')}</label>
          <input
            id="name"
            type="text"
            placeholder={t('form.fields.name.placeholder', 'Your name')}
            {...register("name", {
              onBlur: (event) => {
                setValue("name", event.target.value.trim(), {
                  shouldDirty: true,
                });
              },
              required: t('validation.name.required', 'Please enter your name'),
              maxLength: {
                value: 50,
                message: t('validation.name.maxLength', 'Name cannot exceed 50 characters'),
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="email">{t('form.fields.email.label', 'Email')}</label>
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
              required: t('validation.email.required', 'Please enter your email address'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('validation.email.invalidFormat', 'Please enter a valid email address'),
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="phone">{t('form.fields.phone.label', 'Phone (Optional)')}</label>
          <input
            id="phone"
            type="text"
            placeholder="010-1234-5678"
            {...register("phone")}
          />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="subject">{t('form.fields.subject.label', 'Subject')}</label>
          <Controller
            name="subject"
            control={control}
            rules={{ required: t('validation.subject.required', 'Please select a subject') }}
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
          <label htmlFor="message">{t('form.fields.message.label', 'Message')}</label>
          <textarea
            id="message"
            placeholder={t('form.fields.message.placeholder', 'Tell us about your project or inquiry...')}
            {...register("message", {
              onBlur: (event) => {
                setValue("message", event.target.value.trim(), {
                  shouldDirty: true,
                });
              },
              required: t('validation.message.required', 'Please enter a message'),
              maxLength: {
                value: 1000,
                message: t('validation.message.maxLength', 'Message cannot exceed 1,000 characters'),
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
              required: t('validation.contactConsent.required', 'You must consent to being contacted by the team'),
            })}
          />
          <label htmlFor="contact-consent">
            {t('form.fields.contactConsent.label', 'I consent to being contacted by the team')}
          </label>
          {errors.contactConsent && <p>{errors.contactConsent.message}</p>}
        </div>
        <div>
          <button type="submit">{t('form.actions.submit', 'Send Message')}</button>
        </div>
      </form>
    </div>
  );
}
