import { Contact } from "@/types/contact";

export type FieldErrors = Partial<Record<keyof Contact, string>>;

export function validateContact(contact: Contact): FieldErrors {
  const errors: FieldErrors = {};

  if (!contact.firstName.trim()) errors.firstName = "Required";
  if (!contact.lastName.trim()) errors.lastName = "Required";
  if (!contact.email.trim()) {
    errors.email = "Required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors.email = "Invalid email format";
  }
  if (!contact.phone.trim()) errors.phone = "Required";

  if (contact.type === "company" && !contact.companyName.trim()) {
    errors.companyName = "Required";
  }

  return errors;
}

export function getDisplayName(contact: Contact): string {
  if (contact.type === "company" && contact.companyName) {
    return contact.companyName;
  }
  return `${contact.firstName} ${contact.lastName}`.trim() || "Unnamed Contact";
}
