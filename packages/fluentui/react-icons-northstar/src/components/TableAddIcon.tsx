import createSvgIcon from '../utils/createSvgIcon';

const TableAddIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['table-add'] ? icons['table-add'].icon({ classes }) : null),
  displayName: 'TableAddIcon',
});

export default TableAddIcon;
