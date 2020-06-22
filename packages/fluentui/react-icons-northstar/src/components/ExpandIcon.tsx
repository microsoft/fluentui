import createSvgIcon from '../utils/createSvgIcon';

const ExpandIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['expand'] ? icons['expand'].icon({ classes }) : null),
  displayName: 'ExpandIcon',
});

export default ExpandIcon;
