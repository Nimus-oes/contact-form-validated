export type InquiryType = "general-inquiry" | "project-inquiry" | "other";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  subject: InquiryType | "";
  message: string;
  contactConsent: boolean;
};

export const DEFAULT_FORM_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  contactConsent: false,
};
