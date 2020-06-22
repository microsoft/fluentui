import createSvgIcon from '../utils/createSvgIcon';

const BulletsIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['bullets'] ? icons['bullets'].icon({ classes }) : null),
  displayName: 'BulletsIcon',
});

export default BulletsIcon;
