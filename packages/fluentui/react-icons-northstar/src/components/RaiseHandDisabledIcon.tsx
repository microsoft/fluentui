import createSvgIcon from '../utils/createSvgIcon';

const RaiseHandDisabledIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['raise-hand-disabled'] ? icons['raise-hand-disabled'].icon({ classes }) : null),
  displayName: 'RaiseHandDisabledIcon',
});

export default RaiseHandDisabledIcon;
