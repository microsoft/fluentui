import createSvgIcon from '../utils/createSvgIcon';

const ParticipantRemoveIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['participant-remove'] ? icons['participant-remove'].icon({ classes }) : null),
  displayName: 'ParticipantRemoveIcon',
});

export default ParticipantRemoveIcon;
