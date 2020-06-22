import createSvgIcon from '../utils/createSvgIcon';

const ItalicIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['italic'] ? icons['italic'].icon({ classes }) : null),
  displayName: 'ItalicIcon',
});

export default ItalicIcon;
