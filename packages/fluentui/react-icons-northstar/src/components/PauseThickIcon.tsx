import createSvgIcon from '../utils/createSvgIcon';

const PauseThickIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['pause-thick'] ? icons['pause-thick'].icon({ classes }) : null),
  displayName: 'PauseThickIcon',
});

export default PauseThickIcon;
