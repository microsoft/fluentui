import createSvgIcon from '../utils/createSvgIcon';

const FilesPhotoshopIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-photoshop'] ? icons['files-photoshop'].icon({ classes }) : null),
  displayName: 'FilesPhotoshopIcon',
});

export default FilesPhotoshopIcon;
