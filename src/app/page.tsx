import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MainForm from "@/components/MainForm";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
      <Box sx={{ py: 5 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: "#60a5fa",
            mb: 1,
          }}
        >
          Contact Manager
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
          Search, create, and manage your client contacts
        </Typography>
        <MainForm />
      </Box>
    </Container>
  );
}
