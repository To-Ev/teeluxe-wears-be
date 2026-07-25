
const verifyRoles = (...allowedRoles) =>{
    return (req, res, next) =>{
        if(!req?.roles) return res.status(403).json({ message: 'No Roles found' });
        const rolesArray = [...allowedRoles];
        const roles = req.roles;

        const isAllowed = roles.map( role => rolesArray.includes(role)).find( i => i === true);
        if(!isAllowed) return res.status(403).json({ message: 'Request Denied! Not authorized' });
        next()
    }
}

module.exports = verifyRoles