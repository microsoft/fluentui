import createSvgIcon from '../utils/createSvgIcon';

const FilesVideoIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-video'] ? icons['files-video'].icon({ classes }) : null),
  displayName: 'FilesVideoIcon',
});

export default FilesVideoIcon;
