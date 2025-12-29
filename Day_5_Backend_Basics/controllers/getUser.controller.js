import getUserService from "../services/getUser.service.js";

const getUserController = (request, response) => {
    console.log("Get User Controller");
    const users = getUserService()
    // response.sendStatus(200)

    response.status(200).json({ success: true,message: "Users fetched successfully", users})
    // status code (success, error, redirect)
    // json ({ success: true/false, message: "message", data})
}

export default getUserController