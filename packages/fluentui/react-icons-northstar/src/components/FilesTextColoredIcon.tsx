import createSvgIcon from '../utils/createSvgIcon';

const FilesTextColoredIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-text-colored'] ? icons['files-text-colored'].icon({ classes }) : null),
  displayName: 'FilesTextColoredIcon',
});

export default FilesTextColoredIcon;
