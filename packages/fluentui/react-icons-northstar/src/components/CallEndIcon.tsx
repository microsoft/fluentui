import createSvgIcon from '../utils/createSvgIcon';

const CallEndIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-end'] ? icons['call-end'].icon({ classes }) : null),
  displayName: 'CallEndIcon',
});

export default CallEndIcon;
