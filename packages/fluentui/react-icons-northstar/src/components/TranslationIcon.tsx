import createSvgIcon from '../utils/createSvgIcon';

const TranslationIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['translation'] ? icons['translation'].icon({ classes }) : null),
  displayName: 'TranslationIcon',
});

export default TranslationIcon;
