import createSvgIcon from '../utils/createSvgIcon';

const GalleryIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['gallery'] ? icons['gallery'].icon({ classes }) : null),
  displayName: 'GalleryIcon',
});

export default GalleryIcon;
