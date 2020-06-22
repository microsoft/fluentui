import createSvgIcon from '../utils/createSvgIcon';

const ShareAltIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['share-alt'] ? icons['share-alt'].icon({ classes }) : null),
  displayName: 'ShareAltIcon',
});

export default ShareAltIcon;
