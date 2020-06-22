import createSvgIcon from '../utils/createSvgIcon';

const TriangleUpIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['triangle-up'] ? icons['triangle-up'].icon({ classes }) : null),
  displayName: 'TriangleUpIcon',
});

export default TriangleUpIcon;
