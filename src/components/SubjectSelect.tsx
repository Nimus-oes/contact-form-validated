import * as Select from "radix-ui/select";
import styles from "./SubjectSelect.module.css";
import type { InquiryType } from "../models";
import type { Ref } from "react";
import { useTranslation } from "react-i18next";

type SubjectSelectProps = {
  name: string;
  value: InquiryType | "";
  onValueChange: (value: InquiryType) => void;
  onBlur: () => void;
  triggerRef: Ref<HTMLButtonElement>;
};

export default function SubjectSelect({
  name,
  value,
  onValueChange,
  onBlur,
  triggerRef,
}: SubjectSelectProps) {
  const { t } = useTranslation();
  return (
    <Select.Root name={name} value={value} onValueChange={onValueChange}>
      <Select.Trigger
        id="subject"
        ref={triggerRef}
        onBlur={onBlur}
        className={styles.trigger}
      >
        <Select.Value
          placeholder={t(
            "form.fields.subject.placeholder",
            "문의 유형을 선택하세요",
          )}
        />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" className={styles.content}>
          <Select.Viewport className={styles.viewport}>
            <Select.Item value="general-inquiry" className={styles.item}>
              <Select.ItemText>
                {t("form.fields.subject.options.general", "일반 문의")}
              </Select.ItemText>
            </Select.Item>

            <Select.Item value="project-inquiry" className={styles.item}>
              <Select.ItemText>
                {t("form.fields.subject.options.project", "프로젝트 문의")}
              </Select.ItemText>
            </Select.Item>

            <Select.Item value="other" className={styles.item}>
              <Select.ItemText>
                {t("form.fields.subject.options.other", "기타")}
              </Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
