import createSvgIcon from '../utils/createSvgIcon';

const SyncIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['sync'] ? icons['sync'].icon({ classes }) : null),
  displayName: 'SyncIcon',
});

export default SyncIcon;
