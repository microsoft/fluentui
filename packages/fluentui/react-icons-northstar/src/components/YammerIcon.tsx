import createSvgIcon from '../utils/createSvgIcon';

const YammerIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['yammer'] ? icons['yammer'].icon({ classes }) : null),
  displayName: 'YammerIcon',
});

export default YammerIcon;
