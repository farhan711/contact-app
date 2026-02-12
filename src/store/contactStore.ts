"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AppState,
  ClientTab,
  Contact,
  FieldRole,
  ModalState,
} from "@/types/contact";
import { sendLog } from "@/services/api";

const EMPTY_TAB: ClientTab = { client: null, primary: null, secondary: null };

interface Snackbar {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

interface ContactStore extends AppState {
  activeTab: number;
  modal: ModalState;
  snackbar: Snackbar;

  setActiveTab: (index: number) => void;
  addClient: () => void;
  setContact: (tabIndex: number, role: FieldRole, contact: Contact | null) => void;

  openEditModal: (tabIndex: number, role: FieldRole, contact: Contact) => void;
  openCreateModal: (tabIndex: number, role: FieldRole) => void;
  closeModal: () => void;
  saveModal: (contact: Contact) => void;

  showSnackbar: (message: string, severity: "success" | "error") => void;
  closeSnackbar: () => void;
}

const INITIAL_MODAL: ModalState = {
  open: false,
  mode: "create",
  clientIndex: 0,
  fieldRole: null,
  contact: null,
};

export const useContactStore = create<ContactStore>()(
  persist(
    (set, get) => ({
      clients: [{ ...EMPTY_TAB }],
      activeTab: 0,
      modal: INITIAL_MODAL,
      snackbar: { open: false, message: "", severity: "success" as const },

      setActiveTab: (index) => set({ activeTab: index }),

      addClient: () => {
        const { clients } = get();
        set({
          clients: [...clients, { ...EMPTY_TAB }],
          activeTab: clients.length,
        });
      },

      setContact: (tabIndex, role, contact) => {
        const updated = [...get().clients];
        updated[tabIndex] = { ...updated[tabIndex], [role]: contact };
        set({ clients: updated });
      },

      openEditModal: (tabIndex, role, contact) =>
        set({
          modal: {
            open: true,
            mode: "edit",
            clientIndex: tabIndex,
            fieldRole: role,
            contact,
          },
        }),

      openCreateModal: (tabIndex, role) =>
        set({
          modal: {
            open: true,
            mode: "create",
            clientIndex: tabIndex,
            fieldRole: role,
            contact: null,
          },
        }),

      closeModal: () => set({ modal: INITIAL_MODAL }),

      saveModal: (contact) => {
        const { modal } = get();
        if (modal.fieldRole === null) return;

        const action = modal.mode === "create" ? ("create" as const) : ("update" as const);

        const updated = [...get().clients];
        updated[modal.clientIndex] = {
          ...updated[modal.clientIndex],
          [modal.fieldRole]: contact,
        };

        set({ clients: updated, modal: INITIAL_MODAL });

        sendLog({
          action,
          timestamp: new Date().toISOString(),
          data: {
            clientIndex: modal.clientIndex,
            field: modal.fieldRole,
            contact,
          },
        });

        get().showSnackbar(
          `Contact ${action === "create" ? "created" : "updated"} successfully`,
          "success"
        );
      },

      showSnackbar: (message, severity) =>
        set({ snackbar: { open: true, message, severity } }),

      closeSnackbar: () =>
        set((s) => ({ snackbar: { ...s.snackbar, open: false } })),
    }),
    {
      name: "contact-manager-state",
      partialize: (state) => ({
        clients: state.clients,
        activeTab: state.activeTab,
      }),
    }
  )
);
