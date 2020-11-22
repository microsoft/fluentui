import createSvgIcon from '../utils/createSvgIcon';

const BroadcastViewFullscreenIcon = createSvgIcon({
  svg: ({ classes, icons }) =>
    icons['broadcast-view-fullscreen'] ? icons['broadcast-view-fullscreen'].icon({ classes }) : null,
  displayName: 'BroadcastViewFullscreenIcon',
});

export default BroadcastViewFullscreenIcon;
