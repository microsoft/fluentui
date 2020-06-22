import createSvgIcon from '../utils/createSvgIcon';

const TableIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['table'] ? icons['table'].icon({ classes }) : null),
  displayName: 'TableIcon',
});

export default TableIcon;
