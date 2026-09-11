export type InquiryType = "general-inquiry" | "project-inquiry" | "other";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  subject: InquiryType | "";
  message: string;
  contactConsent: boolean;
};
