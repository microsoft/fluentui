import createSvgIcon from '../utils/createSvgIcon';

const VisioIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['visio'] ? icons['visio'].icon({ classes }) : null),
  displayName: 'VisioIcon',
});

export default VisioIcon;
