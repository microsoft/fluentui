import createSvgIcon from '../utils/createSvgIcon';

const FilesImageIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-image'] ? icons['files-image'].icon({ classes }) : null),
  displayName: 'FilesImageIcon',
});

export default FilesImageIcon;
