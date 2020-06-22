import createSvgIcon from '../utils/createSvgIcon';

const UserFriendsIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['user-friends'] ? icons['user-friends'].icon({ classes }) : null),
  displayName: 'UserFriendsIcon',
});

export default UserFriendsIcon;
