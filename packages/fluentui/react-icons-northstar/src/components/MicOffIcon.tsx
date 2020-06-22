import createSvgIcon from '../utils/createSvgIcon';

const MicOffIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['mic-off'] ? icons['mic-off'].icon({ classes }) : null),
  displayName: 'MicOffIcon',
});

export default MicOffIcon;
