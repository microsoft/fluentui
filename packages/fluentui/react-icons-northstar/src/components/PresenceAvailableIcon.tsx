import createSvgIcon from '../utils/createSvgIcon';

const PresenceAvailableIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['presence-available'] ? icons['presence-available'].icon({ classes }) : null),
  displayName: 'PresenceAvailableIcon',
});

export default PresenceAvailableIcon;
