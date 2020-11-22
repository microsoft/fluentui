import createSvgIcon from '../utils/createSvgIcon';

const CallIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call'] ? icons['call'].icon({ classes }) : null),
  displayName: 'CallIcon',
});

export default CallIcon;
