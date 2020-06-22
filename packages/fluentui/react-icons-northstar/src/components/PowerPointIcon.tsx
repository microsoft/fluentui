import createSvgIcon from '../utils/createSvgIcon';

const PowerPointIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['power-point'] ? icons['power-point'].icon({ classes }) : null),
  displayName: 'PowerPointIcon',
});

export default PowerPointIcon;
