import createSvgIcon from '../utils/createSvgIcon';

const FilesSoundIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-sound'] ? icons['files-sound'].icon({ classes }) : null),
  displayName: 'FilesSoundIcon',
});

export default FilesSoundIcon;
