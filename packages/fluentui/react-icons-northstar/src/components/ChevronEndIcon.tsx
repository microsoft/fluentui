import createSvgIcon from '../utils/createSvgIcon';

const ChevronEndIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['chevron-end'] ? icons['chevron-end'].icon({ classes }) : null),
  displayName: 'ChevronEndIcon',
});

export default ChevronEndIcon;
