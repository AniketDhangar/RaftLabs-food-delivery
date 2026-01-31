import Payment from "./payment.model.js";

const createPayment = async (data) => {
  return Payment.create(data);
};


const findByOrder = async (orderId) => {
  return Payment.findOne({ order: orderId });
};


const findById = async (id) => {
  return Payment.findById(id)
    .populate("order")
    .populate("user", "name email");
};


const updateStatus = async (paymentId, status) => {
  return Payment.findByIdAndUpdate(
    paymentId,
    { status },
    { new: true }
  );
};


const getPaymentsPaginated = async ({
  page = 1,
  limit = 10,
  status,
}) => {
  const skip = (page - 1) * limit;

  const matchStage = {};
  if (status) {
    matchStage.status = status;
  }

  const pipeline = [
    { $match: matchStage },
    { $sort: { createdAt: -1 } },
    {
      $facet: {
        data: [
          { $skip: skip },
          { $limit: Number(limit) },
          {
            $lookup: {
              from: "orders",
              localField: "order",
              foreignField: "_id",
              as: "orderDetails",
            },
          },
          { $unwind: "$orderDetails" },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await Payment.aggregate(pipeline);

  const data = result[0].data;
  const total =
    result[0].totalCount.length > 0
      ? result[0].totalCount[0].count
      : 0;

  return {
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export default {
  createPayment,
  findByOrder,
  findById,
  updateStatus,
  getPaymentsPaginated, 
};
