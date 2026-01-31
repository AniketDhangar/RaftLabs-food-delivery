import Order from "./order.model.js";

const getUserOrdersPaginated = async ({
  userId,
  page = 1,
  limit = 10,
}) => {
  page = Number(page);
  limit = Number(limit);
  const skip = (page - 1) * limit;

  const orders = await Order.find({ user: userId })
    .populate("items.menuItem")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments({ user: userId });

  return {
    data: orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAllOrdersPaginated = async ({
  page = 1,
  limit = 10,
}) => {
  page = Number(page);
  limit = Number(limit);
  const skip = (page - 1) * limit;

  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.menuItem")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments();

  return {
    data: orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const createOrder = async (data) => {
  return Order.create(data);
};

const findById = async (id) => {
  return Order.findById(id).populate("user");
};

const updateStatus = async (id, status) => {
  return Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};



const getDashboardStats = async () => {
  const result = await Order.aggregate([
    {
      $facet: {
        totalOrders: [{ $count: "count" }],
        totalRevenue: [
          { $match: { status: "DELIVERED" } },
          { $group: { _id: null, sum: { $sum: "$totalAmount" } } },
        ],
        pendingOrders: [
          {
            $match: {
              status: { $in: ["ORDER_RECEIVED", "PREPARING"] },
            },
          },
          { $count: "count" },
        ],
        deliveredOrders: [
          { $match: { status: "DELIVERED" } },
          { $count: "count" },
        ],
      },
    },
  ]);

  return {
    totalOrders: result[0].totalOrders[0]?.count || 0,
    totalRevenue: result[0].totalRevenue[0]?.sum || 0,
    pendingOrders: result[0].pendingOrders[0]?.count || 0,
    deliveredOrders: result[0].deliveredOrders[0]?.count || 0,
  };
};


export default {
  getUserOrdersPaginated,
  getAllOrdersPaginated,
  createOrder,
  findById,
  updateStatus,
  getDashboardStats
};
