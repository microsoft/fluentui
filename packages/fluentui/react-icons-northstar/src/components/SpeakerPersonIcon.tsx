import createSvgIcon from '../utils/createSvgIcon';

const SpeakerPersonIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['speaker-person'] ? icons['speaker-person'].icon({ classes }) : null),
  displayName: 'SpeakerPersonIcon',
});

export default SpeakerPersonIcon;
