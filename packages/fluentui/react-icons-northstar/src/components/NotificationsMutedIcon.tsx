import createSvgIcon from '../utils/createSvgIcon';

const NotificationsMutedIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['notifications-muted'] ? icons['notifications-muted'].icon({ classes }) : null),
  displayName: 'NotificationsMutedIcon',
});

export default NotificationsMutedIcon;
