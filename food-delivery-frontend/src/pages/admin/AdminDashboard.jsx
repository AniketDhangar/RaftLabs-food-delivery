import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import AdminNavbar from "../../components/common/AdminNavbar";
import { fetchAdminDashboardApi } from "../../features/admin/admin.api";

const StatCard = ({ title, value }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAdminDashboardApi().then((res) => {
      setStats(res.data.data);
    });
  }, []);

  return (
    <>
      <AdminNavbar />

      <Box p={{ xs: 2, md: 4 }}>
        <Typography variant="h4" mb={3}>
          Dashboard
        </Typography>

        {!stats ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Orders"
                value={stats.totalOrders}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Revenue"
                value={`₹${stats.totalRevenue}`}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Pending Orders"
                value={stats.pendingOrders}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Delivered Orders"
                value={stats.deliveredOrders}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default AdminDashboard;
