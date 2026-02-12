import { Contact, LogPayload } from "@/types/contact";
import { mapDummyJsonUserToContact } from "@/utils/mapDummyJsonUser";

export async function fetchContactById(id: string): Promise<Contact> {
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch user ${id}`);
  const user = await res.json();
  return mapDummyJsonUserToContact(user);
}

export async function sendLog(payload: LogPayload): Promise<void> {
  try {
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Failed to send log:", err);
  }
}
