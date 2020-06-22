import createSvgIcon from '../utils/createSvgIcon';

const UserPhoneIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['user-phone'] ? icons['user-phone'].icon({ classes }) : null),
  displayName: 'UserPhoneIcon',
});

export default UserPhoneIcon;
