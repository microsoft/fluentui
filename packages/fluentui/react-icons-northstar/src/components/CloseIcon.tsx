import createSvgIcon from '../utils/createSvgIcon';

const CloseIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['close'] ? icons['close'].icon({ classes }) : null),
  displayName: 'CloseIcon',
});

export default CloseIcon;
