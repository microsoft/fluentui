import createSvgIcon from '../utils/createSvgIcon';

const PowerPointColorIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['powerpoint-color'] ? icons['powerpoint-color'].icon({ classes }) : null),
  displayName: 'PowerPointColorIcon',
});

export default PowerPointColorIcon;
