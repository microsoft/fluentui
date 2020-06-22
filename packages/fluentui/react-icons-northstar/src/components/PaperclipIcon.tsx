import createSvgIcon from '../utils/createSvgIcon';

const PaperclipIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['paperclip'] ? icons['paperclip'].icon({ classes }) : null),
  displayName: 'PaperclipIcon',
});

export default PaperclipIcon;
