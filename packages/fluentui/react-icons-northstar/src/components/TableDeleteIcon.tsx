import createSvgIcon from '../utils/createSvgIcon';

const TableDeleteIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['table-delete'] ? icons['table-delete'].icon({ classes }) : null),
  displayName: 'TableDeleteIcon',
});

export default TableDeleteIcon;
