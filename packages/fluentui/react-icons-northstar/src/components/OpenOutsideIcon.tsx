import createSvgIcon from '../utils/createSvgIcon';

const OpenOutsideIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['open-outside'] ? icons['open-outside'].icon({ classes }) : null),
  displayName: 'OpenOutsideIcon',
});

export default OpenOutsideIcon;
