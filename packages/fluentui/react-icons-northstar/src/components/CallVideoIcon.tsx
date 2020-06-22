import createSvgIcon from '../utils/createSvgIcon';

const CallVideoIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-video'] ? icons['call-video'].icon({ classes }) : null),
  displayName: 'CallVideoIcon',
});

export default CallVideoIcon;
