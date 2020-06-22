import createSvgIcon from '../utils/createSvgIcon';

const MicIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['mic'] ? icons['mic'].icon({ classes }) : null),
  displayName: 'MicIcon',
});

export default MicIcon;
