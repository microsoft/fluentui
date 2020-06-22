import createSvgIcon from '../utils/createSvgIcon';

const ChevronStartIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['icon-chevron-start'] ? icons['icon-chevron-start'].icon({ classes }) : null),
  displayName: 'ChevronStartIcon',
});

export default ChevronStartIcon;
