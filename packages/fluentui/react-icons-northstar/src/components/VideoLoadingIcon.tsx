import createSvgIcon from '../utils/createSvgIcon';

const VideoLoadingIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['video-loading'] ? icons['video-loading'].icon({ classes }) : null),
  displayName: 'VideoLoadingIcon',
});

export default VideoLoadingIcon;
