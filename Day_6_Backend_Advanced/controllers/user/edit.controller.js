import { isValidObjectId } from "mongoose";
import editUserService from "../../services/user/edit.service.js";

const editUserController = async (req, res, next) => {
    try {
        const { id: userId } = req.params;
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }
        const { name, email } = req.body;
        const user = await editUserService(userId, name, email);
        return res.status(200).json({ success: true, message: 'User updated successfully', user });
    } catch (err) {
        next(err)
    }
}

export default editUserController