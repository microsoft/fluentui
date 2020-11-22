import createSvgIcon from '../utils/createSvgIcon';

const FilesZipIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-zip'] ? icons['files-zip'].icon({ classes }) : null),
  displayName: 'FilesZipIcon',
});

export default FilesZipIcon;
