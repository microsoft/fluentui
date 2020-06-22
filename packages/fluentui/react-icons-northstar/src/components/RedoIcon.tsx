import createSvgIcon from '../utils/createSvgIcon';

const RedoIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['redo'] ? icons['redo'].icon({ classes }) : null),
  displayName: 'RedoIcon',
});

export default RedoIcon;
