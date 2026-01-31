import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Orders", path: "/admin/orders" },
    { label: "Menu", path: "/admin/menu" },
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Admin Panel
        </Typography>

        <Stack direction="row" spacing={2}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              variant={
                location.pathname === item.path
                  ? "outlined"
                  : "text"
              }
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
