import createSvgIcon from '../utils/createSvgIcon';

const MeetingTimeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['meeting-time'] ? icons['meeting-time'].icon({ classes }) : null),
  displayName: 'MeetingTimeIcon',
});

export default MeetingTimeIcon;
