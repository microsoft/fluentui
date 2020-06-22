import createSvgIcon from '../utils/createSvgIcon';

const SwitchCameraIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['switch-camera'] ? icons['switch-camera'].icon({ classes }) : null),
  displayName: 'SwitchCameraIcon',
});

export default SwitchCameraIcon;
