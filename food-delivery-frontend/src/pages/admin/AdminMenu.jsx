import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Switch,
  Button,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  fetchAllMenusApi,
  createMenuApi,
  updateMenuApi,
  deleteMenuApi,
} from "../../features/admin/adminMenu.api";

import AddMenuDialog from "./AddMenuDialog";
import EditMenuDialog from "./EditMenuDialog";
import AdminNavbar from "../../components/common/AdminNavbar";

const AdminMenu = () => {
  const [menus, setMenus] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const loadMenus = async () => {
    const res = await fetchAllMenusApi();
    setMenus(res.data.data.data);
  };

  useEffect(() => {
    loadMenus();
  }, []);

  /* ---------- ADD ---------- */
  const handleAddMenu = async (data) => {
    await createMenuApi(data);
    loadMenus();
  };

  /* ---------- EDIT ---------- */
  const handleEditMenu = async (id, data) => {
    await updateMenuApi(id, data);
    loadMenus();
  };

  /* ---------- TOGGLE ---------- */
  const toggleAvailability = async (menu) => {
    setLoadingId(menu._id);

    await updateMenuApi(menu._id, {
      isAvailable: !menu.isAvailable,
    });

    setLoadingId(null);
    loadMenus();
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );
    if (!confirmDelete) return;

    await deleteMenuApi(id);
    loadMenus();
  };

  return (
    <>
      <AdminNavbar />
  <Box p={{ xs: 2, md: 4 }} maxWidth={1100} mx="auto">
    
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Admin – Menu</Typography>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add Menu
        </Button>
      </Stack>

      {/* Menu List */}
      <Stack spacing={2}>
        {menus.map((menu) => (
          <Card key={menu._id} variant="outlined">
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Box>
                  <Typography fontWeight="bold">{menu.name}</Typography>
                  <Typography color="text.secondary">
                    ₹{menu.price}
                  </Typography>
                </Box>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">
                    {menu.isAvailable ? "Available" : "Unavailable"}
                  </Typography>

                  <Switch
                    checked={menu.isAvailable}
                    disabled={loadingId === menu._id}
                    onChange={() => toggleAvailability(menu)}
                  />

                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedMenu(menu);
                      setOpenEdit(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(menu._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Add Menu Dialog */}
      <AddMenuDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAddMenu}
      />

      {/* Edit Menu Dialog */}
      <EditMenuDialog
        open={openEdit}
        menu={selectedMenu}
        onClose={() => {
          setOpenEdit(false);
          setSelectedMenu(null);
        }}
        onSubmit={handleEditMenu}
      />
    </Box>
    </>
  
  );
};

export default AdminMenu;
