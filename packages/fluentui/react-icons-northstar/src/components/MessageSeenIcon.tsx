import createSvgIcon from '../utils/createSvgIcon';

const MessageSeenIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['message-seen'] ? icons['message-seen'].icon({ classes }) : null),
  displayName: 'MessageSeenIcon',
});

export default MessageSeenIcon;
