import createSvgIcon from '../utils/createSvgIcon';

const PhoneArrowIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['phone-arrow'] ? icons['phone-arrow'].icon({ classes }) : null),
  displayName: 'PhoneArrowIcon',
});

export default PhoneArrowIcon;
