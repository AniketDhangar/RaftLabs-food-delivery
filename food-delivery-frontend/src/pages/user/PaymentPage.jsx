import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { createPaymentApi } from "../../features/payment/payment.api";

const PaymentPage = () => {
  const navigate = useNavigate();

  const [method, setMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const saved = JSON.parse(
    localStorage.getItem("pendingPayment")
  );

  const orderId = saved?.orderId;
  const amount = saved?.amount;

  useEffect(() => {
    if (!orderId) {
      alert("Invalid payment session");
      navigate("/orders");
    }
  }, [orderId, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      await createPaymentApi({
        orderId,
        method,
      });

      localStorage.removeItem("pendingPayment");
      navigate("/orders");
    } catch (err) {
      alert(
        err.response?.data?.message || "Payment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h5" mb={2}>
        Payment
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography>Total Amount</Typography>
          <Typography variant="h6">₹{amount}</Typography>
        </CardContent>
      </Card>

      <RadioGroup
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <FormControlLabel
          value="COD"
          control={<Radio />}
          label="Cash on Delivery"
        />
        <FormControlLabel
          value="UPI"
          control={<Radio />}
          label="UPI (Mock)"
        />
      </RadioGroup>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
        onClick={handlePayment}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </Box>
  );
};

export default PaymentPage;
