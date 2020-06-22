import createSvgIcon from '../utils/createSvgIcon';

const BellSlashIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['bell-slash'] ? icons['bell-slash'].icon({ classes }) : null),
  displayName: 'BellSlashIcon',
});

export default BellSlashIcon;
