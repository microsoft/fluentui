import createSvgIcon from '../utils/createSvgIcon';

const WindowRestoreIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['window-restore'] ? icons['window-restore'].icon({ classes }) : null),
  displayName: 'WindowRestoreIcon',
});

export default WindowRestoreIcon;
