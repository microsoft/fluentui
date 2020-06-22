import createSvgIcon from '../utils/createSvgIcon';

const ChevronEndMediumIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['chevron-right-medium'] ? icons['chevron-right-medium'].icon({ classes }) : null),
  displayName: 'ChevronEndMediumIcon',
});

export default ChevronEndMediumIcon;
