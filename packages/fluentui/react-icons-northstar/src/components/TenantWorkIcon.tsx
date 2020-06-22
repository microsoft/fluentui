import createSvgIcon from '../utils/createSvgIcon';

// TODO: should we reconsider name
const TenantWorkIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['tenant-work'] ? icons['tenant-work'].icon({ classes }) : null),
  displayName: 'TenantWorkIcon',
});

export default TenantWorkIcon;
