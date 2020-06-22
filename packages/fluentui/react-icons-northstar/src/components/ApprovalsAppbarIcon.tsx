import createSvgIcon from '../utils/createSvgIcon';

const ApprovalsAppbarIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['approvals-appbar'] ? icons['approvals-appbar'].icon({ classes }) : null),
  displayName: 'ApprovalsAppbarIcon',
});

export default ApprovalsAppbarIcon;
