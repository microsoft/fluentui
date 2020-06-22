import createSvgIcon from '../utils/createSvgIcon';

const EmailWithDotIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['email-with-dot'] ? icons['email-with-dot'].icon({ classes }) : null),
  displayName: 'EmailWithDotIcon',
});

export default EmailWithDotIcon;
