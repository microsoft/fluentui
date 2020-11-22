import createSvgIcon from '../utils/createSvgIcon';

const AcceptIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['accept'] ? icons['accept'].icon({ classes }) : null),
  displayName: 'AcceptIcon',
});

export default AcceptIcon;
