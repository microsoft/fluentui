import createSvgIcon from '../utils/createSvgIcon';

const WindowMinimizeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['window-minimize'] ? icons['window-minimize'].icon({ classes }) : null),
  displayName: 'WindowMinimizeIcon',
});

export default WindowMinimizeIcon;
