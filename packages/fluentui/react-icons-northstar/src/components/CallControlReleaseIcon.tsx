import createSvgIcon from '../utils/createSvgIcon';

const CallControlReleaseIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-control-release'] ? icons['call-control-release'].icon({ classes }) : null),
  displayName: 'CallControlReleaseIcon',
});

export default CallControlReleaseIcon;
