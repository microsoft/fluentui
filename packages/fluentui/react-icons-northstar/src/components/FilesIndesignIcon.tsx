import createSvgIcon from '../utils/createSvgIcon';

const FilesIndesignIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-indesign'] ? icons['files-indesign'].icon({ classes }) : null),
  displayName: 'FilesIndesignIcon',
});

export default FilesIndesignIcon;
