import createSvgIcon from '../utils/createSvgIcon';

const FilesPictureColoredIcon = createSvgIcon({
  svg: ({ classes, icons }) =>
    icons['files-picture-colored'] ? icons['files-picture-colored'].icon({ classes }) : null,
  displayName: 'FilesPictureColoredIcon',
});

export default FilesPictureColoredIcon;
