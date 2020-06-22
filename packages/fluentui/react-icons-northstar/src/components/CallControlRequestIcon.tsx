import createSvgIcon from '../utils/createSvgIcon';

const CallControlRequestIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-control-request'] ? icons['call-control-request'].icon({ classes }) : null),
  displayName: 'CallControlRequestIcon',
});

export default CallControlRequestIcon;
