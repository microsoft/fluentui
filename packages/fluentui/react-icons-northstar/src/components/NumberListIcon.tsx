import createSvgIcon from '../utils/createSvgIcon';

const NumberListIcon = createSvgIcon({
  svg: ({ classes, rtl, icons }) => (icons['number-list'] ? icons['number-list'].icon({ classes, rtl }) : null),

  displayName: 'NumberListIcon',
});

export default NumberListIcon;
