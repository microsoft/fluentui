import createSvgIcon from '../utils/createSvgIcon';

const SpotlightStopIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['spotlight-stop'] ? icons['spotlight-stop'].icon({ classes }) : null),
  displayName: 'SpotlightStopIcon',
});

export default SpotlightStopIcon;
