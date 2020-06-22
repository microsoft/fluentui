import createSvgIcon from '../utils/createSvgIcon';

const WordIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['word'] ? icons['word'].icon({ classes }) : null),
  displayName: 'WordIcon',
});

export default WordIcon;
