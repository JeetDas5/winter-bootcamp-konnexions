import { isValidObjectId } from "mongoose";
import fetchOneUserService from "../../services/user/fetchOne.service.js";

const fetchOneUserController = async (req, res, next) => {
    try {
        // /:id ==> id is in req.param
        // ?id=123 ==> id is in req.query
        const { id: userId } = req.params;
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }
        const user = await fetchOneUserService(userId);
        return res.status(200).json({ success: true, message: 'User fetched successfully', user });
    } catch (err) {
        next(err)
    }
}

export default fetchOneUserController