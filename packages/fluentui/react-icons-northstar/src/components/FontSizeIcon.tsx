import createSvgIcon from '../utils/createSvgIcon';

const FontSizeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['font-size'] ? icons['font-size'].icon({ classes }) : null),
  displayName: 'FontSizeIcon',
});

export default FontSizeIcon;
