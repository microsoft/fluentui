import createSvgIcon from '../utils/createSvgIcon';

const CallPstnIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-pstn'] ? icons['call-pstn'].icon({ classes }) : null),
  displayName: 'CallPstnIcon',
});

export default CallPstnIcon;
