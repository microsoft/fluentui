import createSvgIcon from '../utils/createSvgIcon';

const ScreencastIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['screencast'] ? icons['screencast'].icon({ classes }) : null),
  displayName: 'ScreencastIcon',
});

export default ScreencastIcon;
