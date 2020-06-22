import createSvgIcon from '../utils/createSvgIcon';

const TeamsIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['teams'] ? icons['teams'].icon({ classes }) : null),
  displayName: 'TeamsIcon',
});

export default TeamsIcon;
