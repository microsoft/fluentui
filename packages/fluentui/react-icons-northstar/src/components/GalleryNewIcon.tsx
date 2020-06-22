import createSvgIcon from '../utils/createSvgIcon';

const GalleryNewIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['gallery-new'] ? icons['gallery-new'].icon({ classes }) : null),
  displayName: 'GalleryNewIcon',
});

export default GalleryNewIcon;
