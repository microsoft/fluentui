import createSvgIcon from '../utils/createSvgIcon';

const CallControlStopPresentingNewIcon = createSvgIcon({
  svg: ({ classes, icons }) =>
    icons['call-control-stop-presenting-new'] ? icons['call-control-stop-presenting-new'].icon({ classes }) : null,
  displayName: 'CallControlStopPresentingNewIcon',
});

export default CallControlStopPresentingNewIcon;
