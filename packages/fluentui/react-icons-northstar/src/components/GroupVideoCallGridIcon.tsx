import createSvgIcon from '../utils/createSvgIcon';

const GroupVideoCallGridIcon = createSvgIcon({
  svg: ({ classes, icons }) =>
    icons['group-video-call-grid'] ? icons['group-video-call-grid'].icon({ classes }) : null,
  displayName: 'GroupVideoCallGridIcon',
});

export default GroupVideoCallGridIcon;
