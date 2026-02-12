"use client";

import { useState, useEffect, forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Contact, ContactType } from "@/types/contact";
import { validateContact, FieldErrors } from "@/utils/validation";

const SlideUp = forwardRef(function SlideUp(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ContactModalProps {
  open: boolean;
  mode: "edit" | "create";
  contact: Contact | null;
  onSave: (contact: Contact) => void;
  onClose: () => void;
}

function emptyContact(): Contact {
  return {
    id: crypto.randomUUID(),
    type: "individual",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
  };
}

export default function ContactModal({
  open,
  mode,
  contact,
  onSave,
  onClose,
}: ContactModalProps) {
  const [form, setForm] = useState<Contact>(emptyContact());
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (open) {
      setForm(mode === "edit" && contact ? { ...contact } : emptyContact());
      setErrors({});
    }
  }, [open, mode, contact]);

  const handleChange = (field: keyof Contact, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleTypeChange = (_: unknown, newType: ContactType | null) => {
    if (newType) {
      setForm((prev) => ({ ...prev, type: newType }));
    }
  };

  const handleSave = () => {
    const fieldErrors = validateContact(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    onSave(form);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={SlideUp}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: "#60a5fa",
        }}
      >
        {mode === "edit" ? "Edit Contact" : "Add New Contact"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5, display: "block" }}>
              Contact Type
            </Typography>
            <ToggleButtonGroup
              value={form.type}
              exclusive
              onChange={handleTypeChange}
              size="small"
              fullWidth
              sx={{
                "& .MuiToggleButton-root": {
                  borderColor: "rgba(255,255,255,0.1)",
                  "&.Mui-selected": {
                    background: "rgba(96, 165, 250, 0.15)",
                    borderColor: "rgba(96, 165, 250, 0.3)",
                  },
                },
              }}
            >
              <ToggleButton value="individual">Individual</ToggleButton>
              <ToggleButton value="company">Company</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box display="flex" gap={2}>
            <TextField
              label="First Name"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Last Name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              fullWidth
              required
              size="small"
            />
          </Box>

          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
            size="small"
          />

          <TextField
            label="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            required
            size="small"
          />

          {form.type === "company" && (
            <TextField
              label="Company Name"
              value={form.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              error={!!errors.companyName}
              helperText={errors.companyName}
              fullWidth
              required
              size="small"
            />
          )}

          <TextField
            label="Address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            fullWidth
            size="small"
            multiline
            rows={2}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "text.secondary",
            "&:hover": { background: "rgba(255,255,255,0.05)" },
          }}
        >
          Discard
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#60a5fa",
            boxShadow: "0 4px 16px rgba(96, 165, 250, 0.3)",
            "&:hover": {
              backgroundColor: "#3b82f6",
              boxShadow: "0 6px 20px rgba(96, 165, 250, 0.4)",
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
