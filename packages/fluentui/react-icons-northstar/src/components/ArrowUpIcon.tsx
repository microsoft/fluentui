import createSvgIcon from '../utils/createSvgIcon';

const ArrowUpIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['arrow-up'] ? icons['arrow-up'].icon({ classes }) : null),
  displayName: 'ArrowUpIcon',
});

export default ArrowUpIcon;
