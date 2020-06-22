import createSvgIcon from '../utils/createSvgIcon';

const FilesAftereffectsIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-aftereffects'] ? icons['files-aftereffects'].icon({ classes }) : null),
  displayName: 'FilesAftereffectsIcon',
});

export default FilesAftereffectsIcon;
