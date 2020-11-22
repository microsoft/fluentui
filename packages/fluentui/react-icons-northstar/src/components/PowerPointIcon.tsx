import createSvgIcon from '../utils/createSvgIcon';

const PowerPointIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['powerpoint'] ? icons['powerpoint'].icon({ classes }) : null),
  displayName: 'PowerPointIcon',
});

export default PowerPointIcon;
