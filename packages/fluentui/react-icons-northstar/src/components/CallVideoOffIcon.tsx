import createSvgIcon from '../utils/createSvgIcon';

const CallVideoOffIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-video-off'] ? icons['call-video-off'].icon({ classes }) : null),
  displayName: 'CallVideoOffIcon',
});

export default CallVideoOffIcon;
