"use client";

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SearchResultsList from "./SearchResultsList";
import ContactSummaryCard from "./ContactSummaryCard";
import { useSearchStore } from "@/store/searchStore";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchContactById } from "@/services/api";
import { Contact, SearchResult } from "@/types/contact";

interface ContactFieldProps {
  label: string;
  contact: Contact | null;
  onContactChange: (contact: Contact | null) => void;
  onEditClick: () => void;
  onCreateClick: () => void;
}

export default function ContactField({
  label,
  contact,
  onContactChange,
  onEditClick,
  onCreateClick,
}: ContactFieldProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const { search, loadUsers, loaded, loading: usersLoading } = useSearchStore();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const results = loaded ? search(debouncedQuery) : [];

  const handleSelect = async (result: SearchResult) => {
    try {
      const fullContact = await fetchContactById(result.id);
      onContactChange(fullContact);
      setQuery("");
      setShowResults(false);
    } catch (err) {
      console.error("Failed to fetch contact:", err);
    }
  };

  const handleClear = () => {
    onContactChange(null);
    setQuery("");
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "text.secondary",
          textTransform: "uppercase",
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </Typography>

      {!contact && (
        <ClickAwayListener onClickAway={() => setShowResults(false)}>
          <Box sx={{ position: "relative" }}>
            <Box display="flex" gap={1}>
              <TextField
                size="small"
                fullWidth
                placeholder="Search contacts..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={onCreateClick}
                sx={{
                  borderColor: "rgba(255,255,255,0.12)",
                  px: 2,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  "&:hover": {
                    borderColor: "#60a5fa",
                    background: "rgba(96, 165, 250, 0.08)",
                  },
                }}
              >
                Add New
              </Button>
            </Box>
            {showResults && (
              <SearchResultsList
                results={results}
                loading={usersLoading}
                onSelect={handleSelect}
              />
            )}
          </Box>
        </ClickAwayListener>
      )}

      {contact && (
        <ContactSummaryCard
          contact={contact}
          onEdit={onEditClick}
          onClear={handleClear}
        />
      )}
    </Box>
  );
}
