import { useEffect, useRef, useState } from "react";
import { DEFAULT_FORM_VALUES, type ContactFormValues } from "../models";
import styles from "./ContactForm.module.css";
import SubjectSelect from "./SubjectSelect";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();
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

  const message = useWatch({
    control,
    name: "message",
  });

  const messageLength = message.length;

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
      <section
        aria-labelledby="success-title"
        className={styles.successContainer}
      >
        <h2 id="success-title" ref={successTitleRef} tabIndex={-1}>
          {t("success.title", "메시지를 보냈습니다!")}
        </h2>
        <p className={styles.successMessage}>
          {t(
            "success.thanks",
            "문의해 주셔서 감사합니다. 가능한 한 빨리 답변드리겠습니다.",
          )}
        </p>
        <hr className={styles.divider} />
        <button
          type="button"
          onClick={handleWriteAgain}
          className={styles.rewriteBtn}
        >
          <span className={styles.rewriteBtnText}>
            {t("success.actions.writeAgain", "다시 작성하기")}
          </span>
          <span className={styles.rewriteBtnIcon}>➤</span>
        </button>
      </section>
    );
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit(handleFormData)}
        className={styles.form}
      >
        <div className={styles.inputItem}>
          <label htmlFor="name">{t("form.fields.name.label", "이름")}</label>
          <input
            required
            className={styles.textField}
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder={t("form.fields.name.placeholder", "이름을 입력하세요")}
            {...register("name", {
              onBlur: (event) => {
                setValue("name", event.target.value.trim(), {
                  shouldDirty: true,
                });
              },
              required: true,
              maxLength: 50,
            })}
          />
          <div id="name-error" className={styles.errorMessageArea}>
            {errors.name?.type === "required" && (
              <p>
                {t("validation.name.required", "이름은 비워둘 수 없습니다")}
              </p>
            )}

            {errors.name?.type === "maxLength" && (
              <p>
                {t(
                  "validation.name.maxLength",
                  "이름은 50자를 초과할 수 없습니다",
                )}
              </p>
            )}
          </div>
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="email">
            {t("form.fields.email.label", "이메일")}
          </label>
          <input
            required
            className={styles.textField}
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@example.com"
            {...register("email", {
              onBlur: (event) => {
                setValue("email", event.target.value.trim(), {
                  shouldDirty: true,
                });
              },
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          <div id="email-error" className={styles.errorMessageArea}>
            {errors.email?.type === "required" && (
              <p>
                {t("validation.email.required", "이메일은 비워둘 수 없습니다")}
              </p>
            )}

            {errors.email?.type === "pattern" && (
              <p>
                {t(
                  "validation.email.invalidFormat",
                  "이메일 형식이 올바르지 않습니다",
                )}
              </p>
            )}
          </div>
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="phone">
            {t("form.fields.phone.label", "전화번호 (선택)")}
          </label>
          <input
            className={styles.textField}
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="010-1234-5678"
            {...register("phone")}
          />
        </div>
        <div className={styles.errorMessageArea}></div>
        <div className={styles.inputItem}>
          <label htmlFor="subject">
            {t("form.fields.subject.label", "문의 유형")}
          </label>
          <Controller
            name="subject"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <SubjectSelect
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                triggerRef={field.ref}
                invalid={Boolean(errors.subject)}
                errorId="subject-error"
              />
            )}
          />
          <div id="subject-error" className={styles.errorMessageArea}>
            {errors.subject?.type === "required" && (
              <p>{t("validation.subject.required", "필수 선택 항목입니다")}</p>
            )}
          </div>
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="message">
            {t("form.fields.message.label", "메시지")}
          </label>
          <div className={styles.messageResizer}>
            <textarea
              required
              id="message"
              placeholder={t(
                "form.fields.message.placeholder",
                "프로젝트나 문의 내용을 알려주세요...",
              )}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message", {
                onBlur: (event) => {
                  setValue("message", event.target.value.trim(), {
                    shouldDirty: true,
                  });
                },
                required: true,
                maxLength: 1000,
              })}
            ></textarea>
            <span className={styles.messageCounter}>{messageLength}/1000</span>
          </div>
          <div id="message-error" className={styles.errorMessageArea}>
            {errors.message?.type === "required" && (
              <p>
                {t(
                  "validation.message.required",
                  "메시지는 비워둘 수 없습니다",
                )}
              </p>
            )}
            {errors.message?.type === "maxLength" && (
              <p>
                {t(
                  "validation.message.maxLength",
                  "메시지는 1000자를 초과할 수 없습니다",
                )}
              </p>
            )}
          </div>
        </div>
        <div>
          <div className={styles.checkItem}>
            <input
              required
              className={styles.checkbox}
              id="contact-consent"
              type="checkbox"
              aria-invalid={Boolean(errors.contactConsent)}
              aria-describedby={
                errors.contactConsent ? "consent-error" : undefined
              }
              {...register("contactConsent", {
                required: true,
              })}
            />
            <label htmlFor="contact-consent" className={styles.checkLabel}>
              {t(
                "form.fields.contactConsent.label",
                "상기 연락처를 통해 연락을 받는 데 동의합니다",
              )}
            </label>
          </div>
          <div id="consent-error" className={styles.errorMessageArea}>
            {errors.contactConsent?.type === "required" && (
              <p>
                {t(
                  "validation.contactConsent.required",
                  "연락에 동의해야 합니다",
                )}
              </p>
            )}
          </div>
        </div>
        <div>
          <button type="submit" className={styles.formSubmitBtn}>
            <span className={styles.btnText}>
              {t("form.actions.submit", "메시지 보내기")}
            </span>
            <span className={styles.btnIcon}>➤</span>
          </button>
        </div>
      </form>
    </div>
  );
}
