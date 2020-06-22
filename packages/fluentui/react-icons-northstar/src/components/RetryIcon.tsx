import createSvgIcon from '../utils/createSvgIcon';

const RetryIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['retry'] ? icons['retry'].icon({ classes }) : null),
  displayName: 'RetryIcon',
});

export default RetryIcon;
