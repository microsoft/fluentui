import createSvgIcon from '../utils/createSvgIcon';

const OneNoteColorIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['onenote-color'] ? icons['onenote-color'].icon({ classes }) : null),
  displayName: 'OneNoteColorIcon',
});

export default OneNoteColorIcon;
