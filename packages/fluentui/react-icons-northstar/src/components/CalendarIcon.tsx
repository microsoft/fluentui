import createSvgIcon from '../utils/createSvgIcon';

const CalendarIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['calendar'] ? icons['calendar'].icon({ classes }) : null),
  displayName: 'CalendarIcon',
});

export default CalendarIcon;
