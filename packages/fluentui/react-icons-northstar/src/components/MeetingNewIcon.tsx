import createSvgIcon from '../utils/createSvgIcon';

const MeetingNewIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['meeting-new'] ? icons['meeting-new'].icon({ classes }) : null),
  displayName: 'MeetingNewIcon',
});

export default MeetingNewIcon;
