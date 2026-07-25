
const ROLES_LIST = {
  Customer: parseInt(process.env.ROLES_CUSTOMER, 10),
  Admin: parseInt(process.env.ROLES_ADMIN, 10),
  Courier: parseInt(process.env.ROLES_COURIER, 10),
  Editor: parseInt(process.env.ROLES_EDITOR, 10),
};

module.exports = ROLES_LIST