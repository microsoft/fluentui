import createSvgIcon from '../utils/createSvgIcon';

const VolumeUpIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['volume-up'] ? icons['volume-up'].icon({ classes }) : null),
  displayName: 'VolumeUpIcon',
});

export default VolumeUpIcon;
