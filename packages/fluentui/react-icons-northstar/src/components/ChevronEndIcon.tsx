import createSvgIcon from '../utils/createSvgIcon';

const ChevronEndIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['icon-chevron-end'] ? icons['icon-chevron-end'].icon({ classes }) : null),
  displayName: 'ChevronEndIcon',
});

export default ChevronEndIcon;
