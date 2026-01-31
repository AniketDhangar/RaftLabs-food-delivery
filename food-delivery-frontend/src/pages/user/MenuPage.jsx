import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Pagination,
  Typography,
  CircularProgress,
} from "@mui/material";

import { fetchMenuApi } from "../../features/menu/menu.api";
import MenuCard from "../../components/common/MenuCard";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchMenu = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetchMenuApi({
        page,
        limit: pagination.limit,
      });

      setMenu(res.data.data.data);
      setPagination((prev) => ({
        ...prev,
        page,
        totalPages: res.data.data.pagination.totalPages,
      }));
    } catch (err) {
      alert("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu(1);
  }, []);

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography variant="h4" mb={3}>
        Menu
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {menu.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <MenuCard item={item} />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={5}>
            <Pagination
              color="primary"
              count={pagination.totalPages}
              page={pagination.page}
              onChange={(_, value) => fetchMenu(value)}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MenuPage;
