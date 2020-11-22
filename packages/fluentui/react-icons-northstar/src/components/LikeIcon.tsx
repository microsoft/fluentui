import createSvgIcon from '../utils/createSvgIcon';

const LikeIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['like'] ? icons['like'].icon({ classes }) : null),
  displayName: 'LikeIcon',
});

export default LikeIcon;
