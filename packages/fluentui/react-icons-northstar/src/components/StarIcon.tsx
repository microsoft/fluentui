import createSvgIcon from '../utils/createSvgIcon';

const StarIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['star'] ? icons['star'].icon({ classes }) : null),
  displayName: 'StarIcon',
});

export default StarIcon;
