import createSvgIcon from '../utils/createSvgIcon';

const PlugsIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['plugs'] ? icons['plugs'].icon({ classes }) : null),
  displayName: 'PlugsIcon',
});

export default PlugsIcon;
