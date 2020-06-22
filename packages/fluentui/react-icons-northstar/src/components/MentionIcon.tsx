import createSvgIcon from '../utils/createSvgIcon';

const MentionIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['mention'] ? icons['mention'].icon({ classes }) : null),
  displayName: 'MentionIcon',
});

export default MentionIcon;
