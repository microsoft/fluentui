import createSvgIcon from '../utils/createSvgIcon';

const ArrowDownIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['arrow-down'] ? icons['arrow-down'].icon({ classes }) : null),
  displayName: 'ArrowDownIcon',
});

export default ArrowDownIcon;
