import createSvgIcon from '../utils/createSvgIcon';

const RedbangIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['redbang'] ? icons['redbang'].icon({ classes }) : null),
  displayName: 'RedbangIcon',
});

export default RedbangIcon;
