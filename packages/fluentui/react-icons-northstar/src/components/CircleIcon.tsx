import createSvgIcon from '../utils/createSvgIcon';

const CircleIcon = createSvgIcon({
  // TODO: check this before merging
  svg: ({ classes, icons }) => (icons['icon-circle'] ? icons['icon-circle'].icon({ classes }) : null),
  displayName: 'CircleIcon',
});

export default CircleIcon;
