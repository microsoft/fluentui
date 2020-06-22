import createSvgIcon from '../utils/createSvgIcon';

const FilesCodeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-code'] ? icons['files-code'].icon({ classes }) : null),
  displayName: 'FilesCodeIcon',
});

export default FilesCodeIcon;
