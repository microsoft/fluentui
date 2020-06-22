import createSvgIcon from '../utils/createSvgIcon';

const FilesGifIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-gif'] ? icons['files-gif'].icon({ classes }) : null),
  displayName: 'FilesGifIcon',
});

export default FilesGifIcon;
