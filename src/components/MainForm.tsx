"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import ContactField from "./ContactField";
import ContactModal from "./ContactModal";
import { useContactStore } from "@/store/contactStore";
import { FieldRole } from "@/types/contact";

const FIELD_ROLES: { role: FieldRole; labelSuffix: string }[] = [
  { role: "client", labelSuffix: "" },
  { role: "primary", labelSuffix: " Primary Contact" },
  { role: "secondary", labelSuffix: " Secondary Contact" },
];

export default function MainForm() {
  const [hydrated, setHydrated] = useState(false);

  const {
    clients,
    activeTab,
    modal,
    snackbar,
    setActiveTab,
    addClient,
    setContact,
    openEditModal,
    openCreateModal,
    closeModal,
    saveModal,
    closeSnackbar,
  } = useContactStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const currentTab = clients[activeTab];
  const clientLabel = `Client ${activeTab + 1}`;

  return (
    <Box className="fade-in-up">
      <Box
        className="glass-panel"
        sx={{ p: 3, mb: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            pb: 0,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              flex: 1,
              "& .MuiTabs-indicator": {
                backgroundColor: "#60a5fa",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            {clients.map((_, i) => (
              <Tab key={i} label={`Client ${i + 1}`} />
            ))}
          </Tabs>
          <Button
            startIcon={<AddIcon />}
            onClick={addClient}
            size="small"
            variant="outlined"
            sx={{
              ml: 1,
              whiteSpace: "nowrap",
              borderColor: "rgba(255,255,255,0.12)",
              "&:hover": {
                borderColor: "#60a5fa",
                background: "rgba(96, 165, 250, 0.08)",
              },
            }}
          >
            Add Client
          </Button>
        </Box>

        {FIELD_ROLES.map(({ role, labelSuffix }, i) => (
          <Box
            key={role}
            className="fade-in-up"
            sx={{ animationDelay: `${i * 0.1}s` }}
          >
            <ContactField
              label={`${clientLabel}${labelSuffix}`}
              contact={currentTab[role]}
              onContactChange={(c) => setContact(activeTab, role, c)}
              onEditClick={() => openEditModal(activeTab, role, currentTab[role]!)}
              onCreateClick={() => openCreateModal(activeTab, role)}
            />
          </Box>
        ))}
      </Box>

      <ContactModal
        open={modal.open}
        mode={modal.mode}
        contact={modal.contact}
        onSave={saveModal}
        onClose={closeModal}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
