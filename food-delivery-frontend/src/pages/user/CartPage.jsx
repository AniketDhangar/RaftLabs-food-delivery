import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../features/cart/cart.context";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box p={{ xs: 2, md: 4 }} maxWidth={900} mx="auto">
      <Typography variant="h4" mb={3}>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item._id} sx={{ mb: 2 }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    ₹{item.price} each
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    inputProps={{ min: 1 }}
                    onChange={(e) =>
                      updateQuantity(
                        item._id,
                        Number(e.target.value)
                      )
                    }
                    sx={{ width: 80 }}
                  />

                  <Typography fontWeight="bold">
                    ₹{item.price * item.quantity}
                  </Typography>

                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="h6">
              Total: ₹{total}
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
