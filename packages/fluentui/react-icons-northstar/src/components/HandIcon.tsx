import createSvgIcon from '../utils/createSvgIcon';

const HandIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['hand'] ? icons['hand'].icon({ classes }) : null),
  displayName: 'HandIcon',
});

export default HandIcon;
