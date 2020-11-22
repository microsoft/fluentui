import createSvgIcon from '../utils/createSvgIcon';

const FilesPdfIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-pdf'] ? icons['files-pdf'].icon({ classes }) : null),
  displayName: 'FilesPdfIcon',
});

export default FilesPdfIcon;
