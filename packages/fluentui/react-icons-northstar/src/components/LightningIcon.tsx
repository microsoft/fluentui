import createSvgIcon from '../utils/createSvgIcon';

const LightningIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['lightning'] ? icons['lightning'].icon({ classes }) : null),
  displayName: 'LightningIcon',
});

export default LightningIcon;
