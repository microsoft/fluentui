import createSvgIcon from '../utils/createSvgIcon';

const ClosedCaptionsIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['closed-captions'] ? icons['closed-captions'].icon({ classes }) : null),
  displayName: 'ClosedCaptionsIcon',
});

export default ClosedCaptionsIcon;
