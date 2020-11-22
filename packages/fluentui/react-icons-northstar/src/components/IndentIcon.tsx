import createSvgIcon from '../utils/createSvgIcon';

const IndentIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['indent'] ? icons['indent'].icon({ classes }) : null),
  displayName: 'IndentIcon',
});

export default IndentIcon;
