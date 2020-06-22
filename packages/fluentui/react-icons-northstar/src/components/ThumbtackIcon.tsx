import createSvgIcon from '../utils/createSvgIcon';

const ThumbtackIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['thumbtack'] ? icons['thumbtack'].icon({ classes }) : null),
  displayName: 'ThumbtackIcon',
});

export default ThumbtackIcon;
