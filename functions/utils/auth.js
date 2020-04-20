const checkUserForPermission = (user, permission) => {
  console.log(user.permissions, permission);
  if (!user || !user.permissions || !user.permissions.includes(permission)) {
    throw 'User does not have the appropriate permission';
  }
};

const availablePermissions = {
  ADD_TALK_PERMISSION: 'add:talks',
};

module.exports = {
  availablePermissions,
  checkUserForPermission,
};
