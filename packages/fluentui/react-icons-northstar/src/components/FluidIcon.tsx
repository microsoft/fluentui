import createSvgIcon from '../utils/createSvgIcon';

const FluidIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['fluid'] ? icons['fluid'].icon({ classes }) : null),
  displayName: 'FluidIcon',
});

export default FluidIcon;
