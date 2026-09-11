import * as Select from "radix-ui/select";
import styles from "./SubjectSelect.module.css";
import type { InquiryType } from "../models";
import type { Ref } from "react";

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
  return (
    <Select.Root name={name} value={value} onValueChange={onValueChange}>
      <Select.Trigger
        id="subject"
        ref={triggerRef}
        onBlur={onBlur}
        className={styles.trigger}
      >
        <Select.Value placeholder="Select a subject" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" className={styles.content}>
          <Select.Viewport>
            <Select.Item value="general-inquiry" className={styles.item}>
              <Select.ItemText>General inquiry</Select.ItemText>
            </Select.Item>

            <Select.Item value="project-inquiry" className={styles.item}>
              <Select.ItemText>Project inquiry</Select.ItemText>
            </Select.Item>

            <Select.Item value="other" className={styles.item}>
              <Select.ItemText>Other</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
