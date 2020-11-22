import createSvgIcon from '../utils/createSvgIcon';

const ShareToIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['share-to'] ? icons['share-to'].icon({ classes }) : null),
  displayName: 'ShareToIcon',
});

export default ShareToIcon;
