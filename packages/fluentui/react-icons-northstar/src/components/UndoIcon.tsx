import createSvgIcon from '../utils/createSvgIcon';

const UndoIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['undo'] ? icons['undo'].icon({ classes }) : null),
  displayName: 'UndoIcon',
});

export default UndoIcon;
