import createSvgIcon from '../utils/createSvgIcon';

const FormatIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['format'] ? icons['format'].icon({ classes }) : null),
  displayName: 'FormatIcon',
});

export default FormatIcon;
