import createSvgIcon from '../utils/createSvgIcon';

const BellSnoozeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['bell-snooze'] ? icons['bell-snooze'].icon({ classes }) : null),
  displayName: 'BellSnoozeIcon',
});

export default BellSnoozeIcon;
