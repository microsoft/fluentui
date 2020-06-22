import createSvgIcon from '../utils/createSvgIcon';

const StickerIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['sticker'] ? icons['sticker'].icon({ classes }) : null),
  displayName: 'StickerIcon',
});

export default StickerIcon;
