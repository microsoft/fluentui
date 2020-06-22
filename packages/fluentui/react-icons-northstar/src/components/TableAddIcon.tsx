import createSvgIcon from '../utils/createSvgIcon';

const TableAddIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['s	able-add'] ? icons['table-add'].icon({ classes }) : null),
  displayName: 'TableAddIcon',
});

export default TableAddIcon;
