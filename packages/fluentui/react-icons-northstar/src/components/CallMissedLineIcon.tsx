import createSvgIcon from '../utils/createSvgIcon';

const CallMissedLineIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-missed-line'] ? icons['call-missed-line'].icon({ classes }) : null),
  displayName: 'CallMissedLineIcon',
});

export default CallMissedLineIcon;
