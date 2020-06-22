import createSvgIcon from '../utils/createSvgIcon';

const PauseIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['pause'] ? icons['pause'].icon({ classes }) : null),
  displayName: 'PauseIcon',
});

export default PauseIcon;
