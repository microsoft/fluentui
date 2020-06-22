import createSvgIcon from '../utils/createSvgIcon';

const CollapseIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['collapse'] ? icons['collapse'].icon({ classes }) : null),
  displayName: 'CollapseIcon',
});

export default CollapseIcon;
