import createSvgIcon from '../utils/createSvgIcon';

const OneNoteColorIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['one-note-color'] ? icons['one-note-color'].icon({ classes }) : null),
  displayName: 'OneNoteColorIcon',
});

export default OneNoteColorIcon;
