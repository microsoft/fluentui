import createSvgIcon from '../utils/createSvgIcon';

const FilesPdfColoredIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-pdf-colored'] ? icons['files-pdf-colored'].icon({ classes }) : null),
  displayName: 'FilesPdfColoredIcon',
});

export default FilesPdfColoredIcon;
