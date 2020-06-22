import createSvgIcon from '../utils/createSvgIcon';

const EyeSlashIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['eye-slash'] ? icons['eye-slash'].icon({ classes }) : null),
  displayName: 'EyeSlashIcon',
});

export default EyeSlashIcon;
