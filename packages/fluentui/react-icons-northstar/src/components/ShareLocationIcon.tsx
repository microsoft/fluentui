import createSvgIcon from '../utils/createSvgIcon';

const ShareLocationIcon = createSvgIcon({
  svg: ({ classes, props, icons }) =>
    icons['share-location'] ? icons['share-location'].icon({ classes, props }) : null,
  displayName: 'ShareLocationIcon',
});

export default ShareLocationIcon;
