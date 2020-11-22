import createSvgIcon from '../utils/createSvgIcon';

const CallRecordingIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['call-recording'] ? icons['call-recording'].icon({ classes }) : null),
  displayName: 'CallRecordingIcon',
});

export default CallRecordingIcon;
