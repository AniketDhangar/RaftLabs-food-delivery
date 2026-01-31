import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useCart } from "../../features/cart/cart.context";

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={
          item.image ||
          "https://via.placeholder.com/300x200?text=Food"
        }
        alt={item.name}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {item.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            minHeight: 40,
          }}
        >
          {item.description}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            ₹{item.price}
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={() => addToCart(item)}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
