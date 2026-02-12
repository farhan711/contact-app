"use client";

import { create } from "zustand";
import Fuse from "fuse.js";
import { SearchResult } from "@/types/contact";
import { mapDummyJsonUserToSearchResult } from "@/utils/mapDummyJsonUser";

interface SearchStore {
  allUsers: SearchResult[];
  fuse: Fuse<SearchResult> | null;
  loaded: boolean;
  loading: boolean;
  loadUsers: () => Promise<void>;
  search: (query: string) => SearchResult[];
}

const FUSE_OPTIONS = {
  keys: ["firstName", "lastName", "email", "companyName"],
  threshold: 0.3,
};

export const useSearchStore = create<SearchStore>()((set, get) => ({
  allUsers: [],
  fuse: null,
  loaded: false,
  loading: false,

  loadUsers: async () => {
    if (get().loaded || get().loading) return;
    set({ loading: true });

    try {
      const res = await fetch("https://dummyjson.com/users?limit=0");
      const data = await res.json();
      const users: SearchResult[] = (data.users ?? []).map(
        mapDummyJsonUserToSearchResult
      );
      const fuse = new Fuse(users, FUSE_OPTIONS);
      set({ allUsers: users, fuse, loaded: true });
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      set({ loading: false });
    }
  },

  search: (query) => {
    const { fuse, allUsers } = get();
    if (!query || query.length < 2) return [];
    if (!fuse) return [];
    return fuse.search(query, { limit: 10 }).map((r) => r.item);
  },
}));
