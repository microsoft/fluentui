import createSvgIcon from '../utils/createSvgIcon';

const PresenceStrokeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['presence-stroke'] ? icons['presence-stroke'].icon({ classes }) : null),
  displayName: 'PresenceStrokeIcon',
});

export default PresenceStrokeIcon;
