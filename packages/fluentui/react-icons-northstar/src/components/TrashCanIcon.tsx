import createSvgIcon from '../utils/createSvgIcon';

const TrashCanIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['trash-can'] ? icons['trash-can'].icon({ classes }) : null),
  displayName: 'TrashCanIcon',
});

export default TrashCanIcon;
