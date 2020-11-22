import createSvgIcon from '../utils/createSvgIcon';

const VideoCameraEmphasisIcon = createSvgIcon({
  svg: ({ classes, icons }) =>
    icons['video-camera-emphasis'] ? icons['video-camera-emphasis'].icon({ classes }) : null,
  displayName: 'VideoCameraEmphasisIcon',
});

export default VideoCameraEmphasisIcon;
