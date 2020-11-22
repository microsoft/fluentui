import createSvgIcon from '../utils/createSvgIcon';

const ExcelIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['excel'] ? icons['excel'].icon({ classes }) : null),
  displayName: 'ExcelIcon',
});

export default ExcelIcon;
