import createSvgIcon from '../utils/createSvgIcon';

const VideomailIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['videomail'] ? icons['videomail'].icon({ classes }) : null),
  displayName: 'VideomailIcon',
});

export default VideomailIcon;
