import createSvgIcon from '../utils/createSvgIcon';

const FilesSketchIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-sketch'] ? icons['files-sketch'].icon({ classes }) : null),
  displayName: 'FilesSketchIcon',
});

export default FilesSketchIcon;
