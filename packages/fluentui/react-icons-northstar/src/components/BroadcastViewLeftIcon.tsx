import createSvgIcon from '../utils/createSvgIcon';

const BroadcastViewLeftIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['broadcast-view-left'] ? icons['broadcast-view-left'].icon({ classes }) : null),
  displayName: 'BroadcastViewLeftIcon',
});

export default BroadcastViewLeftIcon;
