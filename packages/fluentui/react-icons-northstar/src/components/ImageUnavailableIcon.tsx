import createSvgIcon from '../utils/createSvgIcon';

const ImageUnavailableIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['image-unavailable'] ? icons['image-unavailable'].icon({ classes }) : null),
  displayName: 'ImageUnavailableIcon',
});

export default ImageUnavailableIcon;
