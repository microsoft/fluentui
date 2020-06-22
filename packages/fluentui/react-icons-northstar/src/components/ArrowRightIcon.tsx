import createSvgIcon from '../utils/createSvgIcon';

const ArrowRightIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['arrow-right'] ? icons['arrow-right'].icon({ classes }) : null),
  displayName: 'ArrowRightIcon',
});

export default ArrowRightIcon;
