import createSvgIcon from '../utils/createSvgIcon';

const RaiseHandIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['raise-hand'] ? icons['raise-hand'].icon({ classes }) : null),
  displayName: 'RaiseHandIcon',
});

export default RaiseHandIcon;
