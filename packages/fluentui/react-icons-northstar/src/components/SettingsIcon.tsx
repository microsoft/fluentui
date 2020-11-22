import createSvgIcon from '../utils/createSvgIcon';

const SettingsIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['settings'] ? icons['settings'].icon({ classes }) : null),
  displayName: 'SettingsIcon',
});

export default SettingsIcon;
