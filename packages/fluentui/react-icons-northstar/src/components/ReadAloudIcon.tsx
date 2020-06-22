import createSvgIcon from '../utils/createSvgIcon';

const ReadAloudIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['read-aloud'] ? icons['read-aloud'].icon({ classes }) : null),
  displayName: 'ReadAloudIcon',
});

export default ReadAloudIcon;
