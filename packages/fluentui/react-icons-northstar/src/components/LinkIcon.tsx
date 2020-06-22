import createSvgIcon from '../utils/createSvgIcon';

const LinkIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['link'] ? icons['link'].icon({ classes }) : null),
  displayName: 'LinkIcon',
});

export default LinkIcon;
