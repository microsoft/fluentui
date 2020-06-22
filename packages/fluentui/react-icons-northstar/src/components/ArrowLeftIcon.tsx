import createSvgIcon from '../utils/createSvgIcon';

const ArrowLeftIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['arrow-left'] ? icons['arrow-left'].icon({ classes }) : null),
  displayName: 'ArrowLeftIcon',
});

export default ArrowLeftIcon;
