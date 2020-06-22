import createSvgIcon from '../utils/createSvgIcon';

const ComposeIcon = createSvgIcon({
  // TODO: find correct icon
  svg: ({ classes, icons }) => (icons['icon-circle'] ? icons['icon-circle'].icon({ classes }) : null),
  displayName: 'ComposeIcon',
});

export default ComposeIcon;
