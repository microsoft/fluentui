import createSvgIcon from '../utils/createSvgIcon';

const TeamCreateIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['team-create'] ? icons['team-create'].icon({ classes }) : null),
  displayName: 'TeamCreateIcon',
});

export default TeamCreateIcon;
