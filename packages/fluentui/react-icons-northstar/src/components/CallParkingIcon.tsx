import createSvgIcon from '../utils/createSvgIcon';

const CallParkingIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-parking'] ? icons['call-parking'].icon({ classes }) : null),
  displayName: 'CallParkingIcon',
});

export default CallParkingIcon;
