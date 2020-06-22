import createSvgIcon from '../utils/createSvgIcon';

const TagIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['tag'] ? icons['tag'].icon({ classes }) : null),
  displayName: 'TagIcon',
});

export default TagIcon;
