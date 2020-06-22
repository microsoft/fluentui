import createSvgIcon from '../utils/createSvgIcon';

const SettingsAudioIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['settings-audio'] ? icons['settings-audio'].icon({ classes }) : null),
  displayName: 'SettingsAudioIcon',
});

export default SettingsAudioIcon;
