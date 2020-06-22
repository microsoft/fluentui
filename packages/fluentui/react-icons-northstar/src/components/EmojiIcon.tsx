import createSvgIcon from '../utils/createSvgIcon';

const EmojiIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['emoji'] ? icons['emoji'].icon({ classes }) : null),
  displayName: 'EmojiIcon',
});

export default EmojiIcon;
