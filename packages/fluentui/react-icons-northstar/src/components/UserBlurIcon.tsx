import createSvgIcon from '../utils/createSvgIcon';

const UserBlurIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['user-blur'] ? icons['user-blur'].icon({ classes }) : null),
  displayName: 'UserBlurIcon',
});

export default UserBlurIcon;
