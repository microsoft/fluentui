import createSvgIcon from '../utils/createSvgIcon';

const VisioColorIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['visio-color'] ? icons['visio-color'].icon({ classes }) : null),
  displayName: 'VisioColorIcon',
});

export default VisioColorIcon;
