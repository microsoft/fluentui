import createSvgIcon from '../utils/createSvgIcon';

const InfoIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['info'] ? icons['info'].icon({ classes }) : null),
  displayName: 'InfoIcon',
});

export default InfoIcon;
