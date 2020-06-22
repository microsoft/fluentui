import createSvgIcon from '../utils/createSvgIcon';

const RaiseHandColoredIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['raise-hand-colored'] ? icons['raise-hand-colored'].icon({ classes }) : null),
  displayName: 'RaiseHandColoredIcon',
});

export default RaiseHandColoredIcon;
