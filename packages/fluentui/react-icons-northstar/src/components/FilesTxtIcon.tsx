import createSvgIcon from '../utils/createSvgIcon';

const FilesTxtIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-txt'] ? icons['files-txt'].icon({ classes }) : null),
  displayName: 'FilesTxtIcon',
});

export default FilesTxtIcon;
