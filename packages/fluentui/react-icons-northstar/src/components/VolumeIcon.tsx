import createSvgIcon from '../utils/createSvgIcon';

const VolumeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['volume'] ? icons['volume'].icon({ classes }) : null),
  displayName: 'VolumeIcon',
});

export default VolumeIcon;
