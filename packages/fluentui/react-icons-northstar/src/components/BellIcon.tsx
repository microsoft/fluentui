import createSvgIcon from '../utils/createSvgIcon';

const BellIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['bell'] ? icons['bell'].icon({ classes }) : null),
  displayName: 'BellIcon',
});

export default BellIcon;
