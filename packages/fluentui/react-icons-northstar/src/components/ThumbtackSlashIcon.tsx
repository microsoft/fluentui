import createSvgIcon from '../utils/createSvgIcon';

const ThumbtackSlashIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['thumbtack-slash'] ? icons['thumbtack-slash'].icon({ classes }) : null),
  displayName: 'ThumbtackSlashIcon',
});

export default ThumbtackSlashIcon;
