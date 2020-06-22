import createSvgIcon from '../utils/createSvgIcon';

const CompanionIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['companion'] ? icons['companion'].icon({ classes }) : null),
  displayName: 'CompanionIcon',
});

export default CompanionIcon;
