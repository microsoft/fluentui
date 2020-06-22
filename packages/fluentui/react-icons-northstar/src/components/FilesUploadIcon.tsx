import createSvgIcon from '../utils/createSvgIcon';

const FilesUploadIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-upload'] ? icons['files-upload'].icon({ classes }) : null),
  displayName: 'FilesUploadIcon',
});

export default FilesUploadIcon;
