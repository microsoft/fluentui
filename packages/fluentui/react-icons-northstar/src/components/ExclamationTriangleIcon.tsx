import createSvgIcon from '../utils/createSvgIcon';

const ExclamationTriangleIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['exclamation-triangle'] ? icons['exclamation-triangle'].icon({ classes }) : null),
  displayName: 'ExclamationTriangleIcon',
});

export default ExclamationTriangleIcon;
