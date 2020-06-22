import createSvgIcon from '../utils/createSvgIcon';

const PhoneClockIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['phone-clock'] ? icons['phone-clock'].icon({ classes }) : null),
  displayName: 'PhoneClockIcon',
});

export default PhoneClockIcon;
