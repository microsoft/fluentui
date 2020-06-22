import createSvgIcon from '../utils/createSvgIcon';

const CameraIcon = createSvgIcon({
  // TODO: check this before merging
  svg: ({ classes, icons }) => (icons['call-video'] ? icons['call-video'].icon({ classes }) : null),
  displayName: 'CameraIcon',
});

export default CameraIcon;
