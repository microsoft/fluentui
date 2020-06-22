import createSvgIcon from '../utils/createSvgIcon';

const ChevronDownMediumIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['chevron-down-medium'] ? icons['chevron-down-medium'].icon({ classes }) : null),
  displayName: 'ChevronDownMediumIcon',
});

export default ChevronDownMediumIcon;
