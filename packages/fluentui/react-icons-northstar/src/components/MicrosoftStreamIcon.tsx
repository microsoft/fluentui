import createSvgIcon from '../utils/createSvgIcon';

const MicrosoftStreamIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['microsoft-stream'] ? icons['microsoft-stream'].icon({ classes }) : null),
  displayName: 'MicrosoftStreamIcon',
});

export default MicrosoftStreamIcon;
