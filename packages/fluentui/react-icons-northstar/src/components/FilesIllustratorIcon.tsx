import createSvgIcon from '../utils/createSvgIcon';

const FilesIllustratorIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-illustrator'] ? icons['files-illustrator'].icon({ classes }) : null),
  displayName: 'FilesIllustratorIcon',
});

export default FilesIllustratorIcon;
