import createSvgIcon from '../utils/createSvgIcon';

const ToDoListIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['to-do-list'] ? icons['to-do-list'].icon({ classes }) : null),
  displayName: 'ToDoListIcon',
});

export default ToDoListIcon;
