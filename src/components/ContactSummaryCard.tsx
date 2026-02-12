"use client";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { Contact } from "@/types/contact";
import { validateContact, getDisplayName } from "@/utils/validation";

interface ContactSummaryCardProps {
  contact: Contact;
  onEdit: () => void;
  onClear: () => void;
}

export default function ContactSummaryCard({
  contact,
  onEdit,
  onClear,
}: ContactSummaryCardProps) {
  const fieldErrors = validateContact(contact);
  const missingFields = Object.keys(fieldErrors);

  return (
    <Box className="glass-card fade-in-up">
      <CardContent sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={2} mb={1.5}>
          <Avatar
            src={contact.image}
            alt={contact.firstName}
            sx={{
              width: 44,
              height: 44,
              border: "2px solid rgba(96, 165, 250, 0.3)",
              boxShadow: "0 4px 12px rgba(96, 165, 250, 0.15)",
            }}
          >
            {contact.firstName[0]}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
              {getDisplayName(contact)}
            </Typography>
            <Chip
              label={contact.type === "company" ? "Company" : "Individual"}
              size="small"
              color={contact.type === "company" ? "secondary" : "primary"}
              variant="outlined"
              sx={{ height: 22, fontSize: "0.65rem" }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0.5,
            pl: 0.5,
          }}
        >
          <DetailRow label="Email" value={contact.email} missing={!contact.email} />
          <DetailRow label="Phone" value={contact.phone} missing={!contact.phone} />
          {contact.type === "company" && (
            <DetailRow
              label="Company"
              value={contact.companyName}
              missing={!contact.companyName}
            />
          )}
          <DetailRow label="Address" value={contact.address} missing={false} />
        </Box>

        {missingFields.length > 0 && (
          <Typography
            variant="caption"
            color="error"
            sx={{
              mt: 1,
              display: "block",
              background: "rgba(244, 67, 54, 0.08)",
              borderRadius: 1.5,
              px: 1.5,
              py: 0.5,
            }}
          >
            Missing: {Object.values(fieldErrors).join(", ")}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ px: 2, pb: 1.5 }}>
        <Button
          size="small"
          startIcon={<EditIcon sx={{ fontSize: 16 }} />}
          onClick={onEdit}
          sx={{
            color: "#60a5fa",
            "&:hover": { background: "rgba(96, 165, 250, 0.1)" },
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          startIcon={<ClearIcon sx={{ fontSize: 16 }} />}
          color="error"
          onClick={onClear}
          sx={{
            "&:hover": { background: "rgba(244, 67, 54, 0.1)" },
          }}
        >
          Clear
        </Button>
      </CardActions>
    </Box>
  );
}

function DetailRow({
  label,
  value,
  missing,
}: {
  label: string;
  value: string;
  missing: boolean;
}) {
  return (
    <Typography
      variant="body2"
      sx={{
        color: missing ? "error.main" : "text.secondary",
        fontSize: "0.8rem",
      }}
    >
      <Box component="span" sx={{ color: "text.secondary", fontWeight: 600 }}>
        {label}:
      </Box>{" "}
      {value || "\u2014"}
    </Typography>
  );
}
