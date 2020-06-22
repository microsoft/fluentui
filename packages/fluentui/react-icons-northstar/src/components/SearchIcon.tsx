import createSvgIcon from '../utils/createSvgIcon';

const SearchIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['search'] ? icons['search'].icon({ classes }) : null),
  displayName: 'SearchIcon',
});

export default SearchIcon;
