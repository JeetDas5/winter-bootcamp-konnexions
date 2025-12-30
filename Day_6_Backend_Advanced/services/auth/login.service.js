import User from "../../models/user.model.js"
import { comparePassword } from "../../utils/bcrypt.util.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { generateAuthToken } from "../../utils/jwt.util.js";

const loginService = async (credentials) => {
    try {
        const user = await User.findOne({ email: credentials.email }).select('+password');
        if (!user) {
            throw new ApiError(404, 'No user with this email found');
        }

        const isPasswordValid = await comparePassword(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid password');
        }

        const token = await generateAuthToken(user);
        if (!token) {
            throw new ApiError(500, 'Failed to generate authentication token');
        }

        return { user: { id: user._id, name: user.name, email: user.email }, token };
    } catch (err) {
        handleServerError(err);
    }
}

export default loginService;