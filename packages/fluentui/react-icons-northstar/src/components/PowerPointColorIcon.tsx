import createSvgIcon from '../utils/createSvgIcon';

const PowerPointColorIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['power-point-color'] ? icons['power-point-color'].icon({ classes }) : null),
  displayName: 'PowerPointColorIcon',
});

export default PowerPointColorIcon;
