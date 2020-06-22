import createSvgIcon from '../utils/createSvgIcon';

const CallDialpadIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-dialpad'] ? icons['call-dialpad'].icon({ classes }) : null),
  displayName: 'CallDialpadIcon',
});

export default CallDialpadIcon;
