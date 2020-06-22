import createSvgIcon from '../utils/createSvgIcon';

const BoldIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['bold'] ? icons['bold'].icon({ classes }) : null),
  displayName: 'BoldIcon',
});

export default BoldIcon;
