import createSvgIcon from '../utils/createSvgIcon';

const StrikeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['strike'] ? icons['strike'].icon({ classes }) : null),
  displayName: 'StrikeIcon',
});

export default StrikeIcon;
