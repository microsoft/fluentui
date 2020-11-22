import createSvgIcon from '../utils/createSvgIcon';

const CallBlockedIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-blocked'] ? icons['call-blocked'].icon({ classes }) : null),
  displayName: 'CallBlockedIcon',
});

export default CallBlockedIcon;
