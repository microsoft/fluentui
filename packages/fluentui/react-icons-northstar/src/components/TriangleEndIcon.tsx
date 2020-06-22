import createSvgIcon from '../utils/createSvgIcon';

const TriangleEndIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['triangle-right'] ? icons['triangle-right'].icon({ classes }) : null),
  displayName: 'TriangleEndIcon',
});

export default TriangleEndIcon;
