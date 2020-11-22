import createSvgIcon from '../utils/createSvgIcon';

const BroadcastIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['broadcast'] ? icons['broadcast'].icon({ classes }) : null),
  displayName: 'BroadcastIcon',
});

export default BroadcastIcon;
