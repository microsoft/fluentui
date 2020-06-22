import createSvgIcon from '../utils/createSvgIcon';

const CallControlShareIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-control-share'] ? icons['call-control-share'].icon({ classes }) : null),
  displayName: 'CallControlShareIcon',
});

export default CallControlShareIcon;
