import createSvgIcon from '../utils/createSvgIcon';

const NotesIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['notes'] ? icons['notes'].icon({ classes }) : null),
  displayName: 'NotesIcon',
});

export default NotesIcon;
