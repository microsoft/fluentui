import createSvgIcon from '../utils/createSvgIcon';

const RobotIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['robot'] ? icons['robot'].icon({ classes }) : null),
  displayName: 'RobotIcon',
});

export default RobotIcon;
