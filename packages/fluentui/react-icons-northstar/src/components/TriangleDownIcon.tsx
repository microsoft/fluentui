import createSvgIcon from '../utils/createSvgIcon';

const TriangleDownIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['triangle-down'] ? icons['triangle-down'].icon({ classes }) : null),
  displayName: 'TriangleDownIcon',
});

export default TriangleDownIcon;
