"use client";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { SearchResult } from "@/types/contact";

interface SearchResultsListProps {
  results: SearchResult[];
  loading: boolean;
  onSelect: (result: SearchResult) => void;
  anchorEl: HTMLElement | null;
}

export default function SearchResultsList({
  results,
  loading,
  onSelect,
  anchorEl,
}: SearchResultsListProps) {
  const open = loading || results.length > 0;

  if (!open || !anchorEl) return null;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      style={{ zIndex: 1300, width: anchorEl.offsetWidth }}
    >
      {loading ? (
        <Box
          className="glass-dropdown"
          sx={{ p: 2, mt: 0.5 }}
        >
          <Box display="flex" justifyContent="center">
            <CircularProgress size={24} sx={{ color: "#60a5fa" }} />
          </Box>
        </Box>
      ) : (
        <Box
          className="glass-dropdown fade-in-up"
          sx={{
            maxHeight: 300,
            overflow: "auto",
            mt: 0.5,
          }}
        >
          <List dense disablePadding>
            {results.map((result) => (
              <ListItemButton
                key={result.id}
                onClick={() => onSelect(result)}
                sx={{
                  borderRadius: 2,
                  mx: 0.5,
                  my: 0.25,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(96, 165, 250, 0.1)",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={result.image}
                    alt={result.firstName}
                    sx={{
                      border: "2px solid rgba(255,255,255,0.1)",
                      width: 36,
                      height: 36,
                    }}
                  >
                    {result.firstName[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {result.firstName} {result.lastName}
                      </Typography>
                      {result.companyName && (
                        <Chip
                          label="Company"
                          size="small"
                          color="secondary"
                          variant="outlined"
                          sx={{ height: 20, fontSize: "0.65rem" }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {result.email}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </Popper>
  );
}
