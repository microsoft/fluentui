import createSvgIcon from '../utils/createSvgIcon';

const EyeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['eye'] ? icons['eye'].icon({ classes }) : null),
  displayName: 'EyeIcon',
});

export default EyeIcon;
