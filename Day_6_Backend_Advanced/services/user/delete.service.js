import User from "../../models/user.model.js"
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { mapUser } from "../../utils/mapResult.util.js";

const deleteUserService = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return mapUser(user);
    } catch (err) {
        handleServerError(err);
    }
}

export default deleteUserService