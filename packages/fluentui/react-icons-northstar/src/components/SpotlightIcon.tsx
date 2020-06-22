import createSvgIcon from '../utils/createSvgIcon';

const SpotlightIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['spotlight'] ? icons['spotlight'].icon({ classes }) : null),
  displayName: 'SpotlightIcon',
});

export default SpotlightIcon;
