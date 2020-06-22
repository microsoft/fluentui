import createSvgIcon from '../utils/createSvgIcon';

const MoreIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['more'] ? icons['more'].icon({ classes }) : null),
  displayName: 'MoreIcon',
});

export default MoreIcon;
