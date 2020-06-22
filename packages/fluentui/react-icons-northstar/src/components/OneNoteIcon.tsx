import createSvgIcon from '../utils/createSvgIcon';

const OneNoteIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['onenote'] ? icons['onenote'].icon({ classes }) : null),
  displayName: 'OneNoteIcon',
});

export default OneNoteIcon;
