import createSvgIcon from '../utils/createSvgIcon';

const Shift24hIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['shift24h'] ? icons['shift24h'].icon({ classes }) : null),
  displayName: 'Shift24hIcon',
});

export default Shift24hIcon;
