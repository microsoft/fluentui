import createSvgIcon from '../utils/createSvgIcon';

const FilesGenericColoredIcon = createSvgIcon({
  svg: ({ classes, icons }) =>
    icons['files-generic-colored'] ? icons['files-generic-colored'].icon({ classes }) : null,
  displayName: 'FilesGenericColoredIcon',
});

export default FilesGenericColoredIcon;
