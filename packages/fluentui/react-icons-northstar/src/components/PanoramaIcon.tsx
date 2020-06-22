import createSvgIcon from '../utils/createSvgIcon';

const PanoramaIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['panorama'] ? icons['panorama'].icon({ classes }) : null),
  displayName: 'PanoramaIcon',
});

export default PanoramaIcon;
