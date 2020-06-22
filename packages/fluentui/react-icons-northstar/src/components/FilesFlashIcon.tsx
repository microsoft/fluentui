import createSvgIcon from '../utils/createSvgIcon';

const FilesFlashIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-flash'] ? icons['files-flash'].icon({ classes }) : null),
  displayName: 'FilesFlashIcon',
});

export default FilesFlashIcon;
