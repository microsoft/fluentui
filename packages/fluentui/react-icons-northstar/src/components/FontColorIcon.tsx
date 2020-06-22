import createSvgIcon from '../utils/createSvgIcon';

const FontColorIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['font-color'] ? icons['font-color'].icon({ classes }) : null),
  displayName: 'FontColorIcon',
});

export default FontColorIcon;
