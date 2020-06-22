import createSvgIcon from '../utils/createSvgIcon';

// TODO: should we reconsider name
const TenantPersonalIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['tenant-personal'] ? icons['tenant-personal'].icon({ classes }) : null),
  displayName: 'TenantPersonalIcon',
});

export default TenantPersonalIcon;
