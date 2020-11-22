import createSvgIcon from '../utils/createSvgIcon';

const SendIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['send'] ? icons['send'].icon({ classes }) : null),
  displayName: 'SendIcon',
});

export default SendIcon;
