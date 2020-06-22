import createSvgIcon from '../utils/createSvgIcon';

const ReplyIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['reply'] ? icons['reply'].icon({ classes }) : null),
  displayName: 'ReplyIcon',
});

export default ReplyIcon;
