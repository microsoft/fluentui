import createSvgIcon from '../utils/createSvgIcon';

const VolumeDownIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['volume-down'] ? icons['volume-down'].icon({ classes }) : null),
  displayName: 'VolumeDownIcon',
});

export default VolumeDownIcon;
