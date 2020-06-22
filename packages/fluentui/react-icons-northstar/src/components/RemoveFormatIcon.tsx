import createSvgIcon from '../utils/createSvgIcon';

const RemoveFormatIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['remove-format'] ? icons['remove-format'].icon({ classes }) : null),
  displayName: 'RemoveFormatIcon',
});

export default RemoveFormatIcon;
