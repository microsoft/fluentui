import createSvgIcon from '../utils/createSvgIcon';

const CallControlCloseTrayIcon = createSvgIcon({
  svg: ({ classes, icons }) =>
    icons['call-control-close-tray'] ? icons['call-control-close-tray'].icon({ classes }) : null,
  displayName: 'CallControlCloseTrayIcon',
});

export default CallControlCloseTrayIcon;
