import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

const AddMenuDialog = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      price: Number(form.price),
    });
    onClose();
    setForm({ name: "", description: "", price: "", image: "" });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Menu Item</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Name" name="name" onChange={handleChange} />
          <TextField label="Description" name="description" onChange={handleChange} />
          <TextField label="Price" name="price" type="number" onChange={handleChange} />
          <TextField label="Image URL" name="image" onChange={handleChange} />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMenuDialog;
