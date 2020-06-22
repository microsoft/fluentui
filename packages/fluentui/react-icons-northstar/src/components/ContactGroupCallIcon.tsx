import createSvgIcon from '../utils/createSvgIcon';

const ContactGroupCallIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['contact-group-call'] ? icons['contact-group-call'].icon({ classes }) : null),
  displayName: 'ContactGroupCallIcon',
});

export default ContactGroupCallIcon;
