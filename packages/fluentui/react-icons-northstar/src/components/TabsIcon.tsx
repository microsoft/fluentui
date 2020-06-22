import createSvgIcon from '../utils/createSvgIcon';

const TabsIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['tabs'] ? icons['tabs'].icon({ classes }) : null),
  displayName: 'TabsIcon',
});

export default TabsIcon;
