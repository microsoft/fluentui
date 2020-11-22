import createSvgIcon from '../utils/createSvgIcon';

const WindowMaximizeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['window-maximize'] ? icons['window-maximize'].icon({ classes }) : null),
  displayName: 'WindowMaximizeIcon',
});

export default WindowMaximizeIcon;
