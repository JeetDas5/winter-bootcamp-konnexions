import signupService from "../../services/auth/signup.service.js";

const signupController = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    if(typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid input types' });
    }

    try {
        const result = await signupService({ name, email, password });
        return res.status(200).json({ success: true, result });
    } catch (err) {
        next(err)
    }
}

export default signupController