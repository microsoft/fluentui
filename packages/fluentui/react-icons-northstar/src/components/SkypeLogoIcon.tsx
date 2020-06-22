import createSvgIcon from '../utils/createSvgIcon';

const SkypeLogoIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['skype-logo'] ? icons['skype-logo'].icon({ classes }) : null),
  displayName: 'SkypeLogoIcon',
});

export default SkypeLogoIcon;
