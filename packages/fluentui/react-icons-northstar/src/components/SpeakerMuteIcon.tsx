import createSvgIcon from '../utils/createSvgIcon';

const SpeakerMuteIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['speaker-mute'] ? icons['speaker-mute'].icon({ classes }) : null),
  displayName: 'SpeakerMuteIcon',
});

export default SpeakerMuteIcon;
