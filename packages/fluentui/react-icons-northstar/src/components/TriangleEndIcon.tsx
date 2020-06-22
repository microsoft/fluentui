import createSvgIcon from '../utils/createSvgIcon';

const TriangleEndIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['triangle-end'] ? icons['triangle-end'].icon({ classes }) : null),
  displayName: 'TriangleEndIcon',
});

export default TriangleEndIcon;
