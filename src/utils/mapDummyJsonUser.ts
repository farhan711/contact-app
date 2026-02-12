import { Contact, ContactType, SearchResult } from "@/types/contact";

interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  address?: {
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  company?: {
    name?: string;
  };
}

export function mapDummyJsonUserToContact(user: DummyJsonUser): Contact {
  const companyName = user.company?.name ?? "";
  const type: ContactType = companyName ? "company" : "individual";

  const addressParts = [
    user.address?.address,
    user.address?.city,
    user.address?.state,
    user.address?.postalCode,
  ].filter(Boolean);

  return {
    id: String(user.id),
    type,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    companyName,
    address: addressParts.join(", "),
    image: user.image ?? "",
  };
}

export function mapDummyJsonUserToSearchResult(
  user: DummyJsonUser
): SearchResult {
  return {
    id: String(user.id),
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email ?? "",
    image: user.image ?? "",
    companyName: user.company?.name ?? "",
  };
}
