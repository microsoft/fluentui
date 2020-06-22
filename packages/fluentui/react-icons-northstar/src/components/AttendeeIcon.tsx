import createSvgIcon from '../utils/createSvgIcon';

const AttendeeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['attendee'] ? icons['attendee'].icon({ classes }) : null),
  displayName: 'AttendeeIcon',
});

export default AttendeeIcon;
