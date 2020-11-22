import createSvgIcon from '../utils/createSvgIcon';

const DownloadIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['download'] ? icons['download'].icon({ classes }) : null),
  displayName: 'DownloadIcon',
});

export default DownloadIcon;
