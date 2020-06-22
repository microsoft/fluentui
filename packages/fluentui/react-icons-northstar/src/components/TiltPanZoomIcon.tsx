import createSvgIcon from '../utils/createSvgIcon';

const TiltPanZoomIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['tilt-pan-zoom'] ? icons['tilt-pan-zoom'].icon({ classes }) : null),
  displayName: 'TiltPanZoomIcon',
});

export default TiltPanZoomIcon;
