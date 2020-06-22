import createSvgIcon from '../utils/createSvgIcon';

const OneNoteIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['one-note'] ? icons['one-note'].icon({ classes }) : null),
  displayName: 'OneNoteIcon',
});

export default OneNoteIcon;
