import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  MenuItem,
  Select,
} from "@mui/material";

import {
  fetchAllOrdersApi,
  updateOrderStatusApi,
} from "../../features/admin/admin.api";
import AdminNavbar from "../../components/common/AdminNavbar";

const ORDER_STATUSES = [
  "ORDER_RECEIVED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

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

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetchAllOrdersApi();
    setOrders(res.data.data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    await updateOrderStatusApi(orderId, status);
    fetchOrders(); // refresh list
  };

  return (
    <Box p={{ xs: 2, md: 4 }} maxWidth={1100} mx="auto">
      <AdminNavbar />
      <Typography variant="h4" mb={3}>
        Admin – Orders
      </Typography>

      <Stack spacing={2}>
        {orders.map((order) => (
          <Card key={order._id} variant="outlined">
            <CardContent>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ md: "center" }}
                spacing={2}
              >
                <Box>
                  <Typography fontWeight="bold">
                    Order #{order._id.slice(-6)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.user?.email || "Guest"}
                  </Typography>
                </Box>

                <Typography fontWeight="bold">
                  ₹{order.totalAmount}
                </Typography>

                <Chip
                  label={order.status.replaceAll("_", " ")}
                  color={statusColor(order.status)}
                  variant="outlined"
                />

                <Select
                  size="small"
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  {ORDER_STATUSES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s.replaceAll("_", " ")}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default AdminOrders;
