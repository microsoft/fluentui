import createSvgIcon from '../utils/createSvgIcon';

const ScreenshareIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['screenshare'] ? icons['screenshare'].icon({ classes }) : null),
  displayName: 'ScreenshareIcon',
});

export default ScreenshareIcon;
