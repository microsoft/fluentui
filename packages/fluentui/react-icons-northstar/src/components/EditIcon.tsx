import createSvgIcon from '../utils/createSvgIcon';

const EditIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['edit'] ? icons['edit'].icon({ classes }) : null),
  displayName: 'EditIcon',
});

export default EditIcon;
