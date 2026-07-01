import User from "../model/userModel.js";

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		res.status(200).json({
			status: "success",
			results: users.length,
			data: {
				users,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Failed to fetch users",
		});
	}
};




