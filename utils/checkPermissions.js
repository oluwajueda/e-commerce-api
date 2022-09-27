const CustomError = require('../errors')

const checkPermissions = (requestUser, resourceUserId) =>{
// check if the user is an admin before being authorized to check for a singe user
    // console.log(requestUser);
    // console.log(resourceUserId);
    // console.log(typeof resourceUserId);

    if(requestUser.role === 'admin') return;

    if(requestUser.userId === resourceUserId.toString()) return
    throw new CustomError.UnauthenticatedError('Not authorized to access this route')


}

module.exports = checkPermissions;