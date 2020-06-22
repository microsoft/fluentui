import createSvgIcon from '../utils/createSvgIcon';

const OutdentIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['outdent'] ? icons['outdent'].icon({ classes }) : null),
  displayName: 'OutdentIcon',
});

export default OutdentIcon;
