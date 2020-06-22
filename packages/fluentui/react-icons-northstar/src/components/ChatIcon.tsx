import createSvgIcon from '../utils/createSvgIcon';

const ChatIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['chat'] ? icons['chat'].icon({ classes }) : null),
  displayName: 'ChatIcon',
});

export default ChatIcon;
