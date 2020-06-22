import createSvgIcon from '../utils/createSvgIcon';

const MarkAsUnreadIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['mark-as-unread'] ? icons['mark-as-unread'].icon({ classes }) : null),
  displayName: 'MarkAsUnreadIcon',
});

export default MarkAsUnreadIcon;
