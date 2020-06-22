import createSvgIcon from '../utils/createSvgIcon';

const AddIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['add'] ? icons['add'].icon({ classes }) : null),
  displayName: 'AddIcon',
});

export default AddIcon;
