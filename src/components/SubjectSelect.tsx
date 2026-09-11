import * as Select from "radix-ui/select";
import styles from "./SubjectSelect.module.css";
import type { InquiryType } from "../models";
import type { Ref } from "react";
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  return (
    <Select.Root name={name} value={value} onValueChange={onValueChange}>
      <Select.Trigger
        id="subject"
        ref={triggerRef}
        onBlur={onBlur}
        className={styles.trigger}
      >
        <Select.Value placeholder={t('form.fields.subject.placeholder', 'Select a subject')} />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" className={styles.content}>
          <Select.Viewport>
            <Select.Item value="general-inquiry" className={styles.item}>
              <Select.ItemText>{t('form.fields.subject.options.general', 'General inquiry')}</Select.ItemText>
            </Select.Item>

            <Select.Item value="project-inquiry" className={styles.item}>
              <Select.ItemText>{t('form.fields.subject.options.project', 'Project inquiry')}</Select.ItemText>
            </Select.Item>

            <Select.Item value="other" className={styles.item}>
              <Select.ItemText>{t('form.fields.subject.options.other', 'Other')}</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
