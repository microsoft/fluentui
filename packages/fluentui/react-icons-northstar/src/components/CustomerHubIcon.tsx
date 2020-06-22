import createSvgIcon from '../utils/createSvgIcon';

const CustomerHubIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['customer-hub'] ? icons['customer-hub'].icon({ classes }) : null),
  displayName: 'CustomerHubIcon',
});

export default CustomerHubIcon;
