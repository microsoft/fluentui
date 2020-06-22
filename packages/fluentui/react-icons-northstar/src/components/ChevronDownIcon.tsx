import createSvgIcon from '../utils/createSvgIcon';

const ChevronDownIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['chevron-down'] ? icons['chevron-down'].icon({ classes }) : null),
  displayName: 'ChevronDownIcon',
});

export default ChevronDownIcon;
