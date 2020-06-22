import createSvgIcon from '../utils/createSvgIcon';

const ExcelColorIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['excel-color'] ? icons['excel-color'].icon({ classes }) : null),
  displayName: 'ExcelColorIcon',
});

export default ExcelColorIcon;
