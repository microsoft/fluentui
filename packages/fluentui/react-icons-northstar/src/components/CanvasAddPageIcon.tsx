import createSvgIcon from '../utils/createSvgIcon';

const CanvasAddPageIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['canvas-add-page'] ? icons['canvas-add-page'].icon({ classes }) : null),
  displayName: 'CanvasAddPageIcon',
});

export default CanvasAddPageIcon;
