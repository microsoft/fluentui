import createSvgIcon from '../utils/createSvgIcon';

const EmailIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['email'] ? icons['email'].icon({ classes }) : null),
  displayName: 'EmailIcon',
});

export default EmailIcon;
