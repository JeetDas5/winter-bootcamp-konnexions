import User from "../../models/user.model.js"
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { mapUser } from "../../utils/mapResult.util.js";

const editUserService = async (userId, name, email) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        user.name = name;
        user.email = email;
        await user.save();
        return mapUser(user);
    } catch (err) {
        handleServerError(err);
    }
}

export default editUserService