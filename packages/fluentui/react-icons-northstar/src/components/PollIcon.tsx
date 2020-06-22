import createSvgIcon from '../utils/createSvgIcon';

const PollIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['poll'] ? icons['poll'].icon({ classes }) : null),
  displayName: 'PollIcon',
});

export default PollIcon;
