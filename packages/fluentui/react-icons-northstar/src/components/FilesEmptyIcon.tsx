import createSvgIcon from '../utils/createSvgIcon';

const FilesEmptyIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-empty'] ? icons['files-empty'].icon({ classes }) : null),
  displayName: 'FilesEmptyIcon',
});

export default FilesEmptyIcon;
