import createSvgIcon from '../utils/createSvgIcon';

const ErrorIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['error'] ? icons['error'].icon({ classes }) : null),
  displayName: 'ErrorIcon',
});

export default ErrorIcon;
