import createSvgIcon from '../utils/createSvgIcon';

const WordColorIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['word-color'] ? icons['word-color'].icon({ classes }) : null),
  displayName: 'WordColorIcon',
});

export default WordColorIcon;
