import ApiError from "../../utils/ApiError.js";
import paymentRepository from "./payment.repository.js";
import orderRepository from "../order/order.repository.js";

const createPayment = async ({ userId, orderId, method }) => {
    try {
        const order = await orderRepository.findById(orderId);

        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        //   if (order.user._id.toString() !== userId) {
        //     throw new ApiError(403, "Access denied");
        //   }

        const orderUserId =
            order.user._id?.toString() || order.user.toString();

        if (orderUserId !== userId.toString()) {
            throw new ApiError(403, "Access denied");
        }



        const existingPayment = await paymentRepository.findByOrder(orderId);
        if (existingPayment) {
            throw new ApiError(409, "Payment already initiated");
        }

        const payment = await paymentRepository.createPayment({
            order: orderId,
            user: userId,
            amount: order.totalAmount,
            method,
            status: method === "COD" ? "SUCCESS" : "PENDING",
        });
        console.log("ORDER.USER:", order.user);
        console.log("REQ.USER.ID:", userId);

        return payment;
    } catch (error) {
        console.error("Error in createPayment:", error);

        throw error;
    }





};

const updatePaymentStatus = async (paymentId, status) => {
    const allowedStatuses = ["PENDING", "SUCCESS", "FAILED"];

    if (!allowedStatuses.includes(status)) {
        throw new ApiError(400, "Invalid payment status");
    }

    const updatedPayment = await paymentRepository.updateStatus(
        paymentId,
        status
    );

    if (!updatedPayment) {
        throw new ApiError(404, "Payment not found");
    }

    return updatedPayment;
};

export default {
    createPayment,
    updatePaymentStatus,
};
