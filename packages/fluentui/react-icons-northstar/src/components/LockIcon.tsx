import createSvgIcon from '../utils/createSvgIcon';

const LockIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['lock'] ? icons['lock'].icon({ classes }) : null),
  displayName: 'LockIcon',
});

export default LockIcon;
