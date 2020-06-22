import createSvgIcon from '../utils/createSvgIcon';

const MenuIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['menu'] ? icons['menu'].icon({ classes }) : null),
  displayName: 'MenuIcon',
});

export default MenuIcon;
