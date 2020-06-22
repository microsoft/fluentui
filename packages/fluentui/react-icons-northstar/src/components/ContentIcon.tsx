import createSvgIcon from '../utils/createSvgIcon';

const ContentIcon = createSvgIcon({
  // TODO: find correct icon
  svg: ({ classes, icons }) => (icons['icon-circle'] ? icons['icon-circle'].icon({ classes }) : null),
  displayName: 'ContentIcon',
});

export default ContentIcon;
