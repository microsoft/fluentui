import createSvgIcon from '../utils/createSvgIcon';

const ChevronStartIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['chevron-start'] ? icons['chevron-start'].icon({ classes }) : null),
  displayName: 'ChevronStartIcon',
});

export default ChevronStartIcon;
