import createSvgIcon from '../utils/createSvgIcon';

const BookmarkIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['bookmark'] ? icons['bookmark'].icon({ classes }) : null),
  displayName: 'BookmarkIcon',
});

export default BookmarkIcon;
