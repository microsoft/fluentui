import createSvgIcon from '../utils/createSvgIcon';

const EyeFriendlierIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['eye-friendlier'] ? icons['eye-friendlier'].icon({ classes }) : null),
  displayName: 'EyeFriendlierIcon',
});

export default EyeFriendlierIcon;
