import { isValidObjectId } from "mongoose";
import deleteUserService from "../../services/user/delete.service.js";

const deleteUserController = async (req, res, next) => {
    try {
        const { id: userId } = req.params;
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }
        const user = await deleteUserService(userId);
        return res.status(200).json({ success: true, message: 'User deleted successfully', user });
    } catch (err) {
        next(err)
    }
}

export default deleteUserController