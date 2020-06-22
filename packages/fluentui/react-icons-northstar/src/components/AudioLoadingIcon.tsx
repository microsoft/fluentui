import createSvgIcon from '../utils/createSvgIcon';

const AudioLoadingIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['audio-loading'] ? icons['audio-loading'].icon({ classes }) : null),
  displayName: 'AudioLoadingIcon',
});

export default AudioLoadingIcon;
