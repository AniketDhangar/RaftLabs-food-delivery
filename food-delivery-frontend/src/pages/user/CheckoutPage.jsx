import { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../features/cart/cart.context";
import { placeOrderApi } from "../../features/order/order.api";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();

    const [form, setForm] = useState({
        deliveryAddress: "",
        phone: "",
    });

    const [loading, setLoading] = useState(false);

    const total = cart.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                items: cart.map((item) => ({
                    menuItemId: item._id,
                    quantity: item.quantity,
                })),
                deliveryAddress: form.deliveryAddress,
                phone: form.phone,
            };

            const res = await placeOrderApi(payload);

            clearCart();

            localStorage.setItem(
                "pendingPayment",
                JSON.stringify({
                    orderId: res.data.data._id,
                    amount: res.data.data.totalAmount,
                })
            );

            navigate("/payment");


        } catch (err) {
            alert(err.response?.data?.message || "Order failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={3} maxWidth={600} mx="auto">
            <Typography variant="h5" mb={2}>
                Checkout
            </Typography>

            <TextField
                fullWidth
                label="Delivery Address"
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                margin="normal"
            />

            <Divider sx={{ my: 3 }} />

            <Typography>Total: ₹{total}</Typography>

            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                disabled={loading}
                onClick={handlePlaceOrder}
            >
                {loading ? "Placing Order..." : "Place Order"}
            </Button>
        </Box>
    );
};

export default CheckoutPage;
