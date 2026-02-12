export type ContactType = "individual" | "company";

export interface Contact {
  id: string;
  type: ContactType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  image?: string;
}

export type FieldRole = "client" | "primary" | "secondary";

export interface ClientTab {
  client: Contact | null;
  primary: Contact | null;
  secondary: Contact | null;
}

export interface AppState {
  clients: ClientTab[];
}

export interface SearchResult {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  companyName: string;
}

export interface LogPayload {
  action: "create" | "update";
  timestamp: string;
  data: unknown;
}

export interface ModalState {
  open: boolean;
  mode: "edit" | "create";
  clientIndex: number;
  fieldRole: FieldRole | null;
  contact: Contact | null;
}
