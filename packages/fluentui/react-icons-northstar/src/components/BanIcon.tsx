import createSvgIcon from '../utils/createSvgIcon';

const BanIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['ban'] ? icons['ban'].icon({ classes }) : null),
  displayName: 'BanIcon',
});

export default BanIcon;
