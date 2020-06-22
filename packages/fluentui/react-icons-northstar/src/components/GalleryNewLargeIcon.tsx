import createSvgIcon from '../utils/createSvgIcon';

const GalleryNewLargeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['gallery-new-large'] ? icons['gallery-new-large'].icon({ classes }) : null),
  displayName: 'GalleryNewLargeIcon',
});

export default GalleryNewLargeIcon;
