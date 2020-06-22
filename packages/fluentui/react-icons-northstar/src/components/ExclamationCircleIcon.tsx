import createSvgIcon from '../utils/createSvgIcon';

const ExclamationCircleIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['exclamation-circle'] ? icons['exclamation-circle'].icon({ classes }) : null),
  displayName: 'ExclamationCircleIcon',
});

export default ExclamationCircleIcon;
