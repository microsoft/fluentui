import createSvgIcon from '../utils/createSvgIcon';

const UnderlineIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['underline'] ? icons['underline'].icon({ classes }) : null),
  displayName: 'UnderlineIcon',
});

export default UnderlineIcon;
