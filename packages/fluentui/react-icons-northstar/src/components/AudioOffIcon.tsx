import createSvgIcon from '../utils/createSvgIcon';

const AudioOffIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['audio-off'] ? icons['audio-off'].icon({ classes }) : null),
  displayName: 'AudioOffIcon',
});

export default AudioOffIcon;
