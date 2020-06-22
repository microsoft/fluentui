import createSvgIcon from '../utils/createSvgIcon';

const PopupIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['popup'] ? icons['popup'].icon({ classes }) : null),
  displayName: 'PopupIcon',
});

export default PopupIcon;
