import createSvgIcon from '../utils/createSvgIcon';

const PanoramaOffIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['panorama-off'] ? icons['panorama-off'].icon({ classes }) : null),
  displayName: 'PanoramaOffIcon',
});

export default PanoramaOffIcon;
