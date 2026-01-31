import Menu from "./menu.model.js";


const getPaginatedMenu = async ({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "desc",
}) => {
  const skip = (page - 1) * limit;
  const sortOrder = order === "asc" ? 1 : -1;

  const pipeline = [
    {
      $match: { isAvailable: true },
    },
    {
      $sort: { [sort]: sortOrder },
    },
    {
      $facet: {
        data: [
          { $skip: skip },
          { $limit: Number(limit) },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await Menu.aggregate(pipeline);

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

const getAllMenuAdmin = async ({
  page = 1,
  limit = 10,
}) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Menu.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Menu.countDocuments(),
  ]);

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

const findById = async (id) => {
  return Menu.findById(id);
};

const createMenuItem = async (data) => {
  return Menu.create(data);
};

const updateMenuItem = async (id, data) => {
  return Menu.findByIdAndUpdate(id, { $set: data }, {
    new: true,
    runValidators: false,
  });
};

const deleteMenuItem = async (id) => {
  return Menu.findByIdAndDelete(id);
};

export default {
  getPaginatedMenu,
  findById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuAdmin
};
