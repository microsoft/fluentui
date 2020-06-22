import createSvgIcon from '../utils/createSvgIcon';

const ShiftActivityIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['shift-activity'] ? icons['shift-activity'].icon({ classes }) : null),
  displayName: 'ShiftActivityIcon',
});

export default ShiftActivityIcon;
