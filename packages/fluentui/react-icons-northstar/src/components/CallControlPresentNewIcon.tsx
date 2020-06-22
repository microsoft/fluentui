import createSvgIcon from '../utils/createSvgIcon';

const CallControlPresentNewIcon = createSvgIcon({
  svg: ({ classes, icons }) =>
    icons['call-control-present-new'] ? icons['call-control-present-new'].icon({ classes }) : null,
  displayName: 'CallControlPresentNewIcon',
});

export default CallControlPresentNewIcon;
