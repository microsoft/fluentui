import createSvgIcon from '../utils/createSvgIcon';

const FlagIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['flag'] ? icons['flag'].icon({ classes }) : null),
  displayName: 'FlagIcon',
});

export default FlagIcon;
