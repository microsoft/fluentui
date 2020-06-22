import createSvgIcon from '../utils/createSvgIcon';

const ChevronEndMediumIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['chevron-end-medium'] ? icons['chevron-end-medium'].icon({ classes }) : null),
  displayName: 'ChevronEndMediumIcon',
});

export default ChevronEndMediumIcon;
