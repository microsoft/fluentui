import createSvgIcon from '../utils/createSvgIcon';

const ParticipantAddIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['participant-add'] ? icons['participant-add'].icon({ classes }) : null),
  displayName: 'ParticipantAddIcon',
});

export default ParticipantAddIcon;
