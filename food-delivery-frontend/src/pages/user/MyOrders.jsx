import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import api from "../../services/api/axios";

const statusColor = (status) => {
  switch (status) {
    case "ORDER_RECEIVED":
      return "default";
    case "PREPARING":
      return "warning";
    case "OUT_FOR_DELIVERY":
      return "info";
    case "DELIVERED":
      return "success";
    default:
      return "default";
  }
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => {
      setOrders(res.data.data.data);
    });
  }, []);

  if (!orders.length) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6" color="text.secondary">
          No orders yet 🍽️
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your placed orders will appear here.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, md: 4 }} maxWidth={900} mx="auto">
      <Typography variant="h4" mb={3}>
        My Orders
      </Typography>

      <Stack spacing={2}>
        {orders.map((order) => (
          <Card key={order._id} variant="outlined">
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ sm: "center" }}
                spacing={2}
              >
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Order ID
                  </Typography>
                  <Typography fontWeight="bold">
                    #{order._id.slice(-6)}
                  </Typography>
                </Box>

                <Chip
                  label={order.status.replaceAll("_", " ")}
                  color={statusColor(order.status)}
                  variant="outlined"
                />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color="text.secondary">
                  Total Amount
                </Typography>
                <Typography fontWeight="bold">
                  ₹{order.totalAmount}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default MyOrders;
