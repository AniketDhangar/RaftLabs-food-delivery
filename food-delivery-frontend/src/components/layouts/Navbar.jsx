import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../features/cart/cart.context";
import { clearAuthData } from "../../features/auth/auth.utils";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = () => {
    clearAuthData();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Food Delivery
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Button color="inherit" onClick={() => navigate("/")}>
          Menu
        </Button>

        <Button color="inherit" onClick={() => navigate("/orders")}>
          Orders
        </Button>

        <IconButton
          color="inherit"
          onClick={() => navigate("/cart")}
        >
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
