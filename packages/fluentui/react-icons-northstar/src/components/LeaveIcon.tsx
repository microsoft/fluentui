import createSvgIcon from '../utils/createSvgIcon';

const LeaveIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['leave'] ? icons['leave'].icon({ classes }) : null),
  displayName: 'LeaveIcon',
});

export default LeaveIcon;
