import createSvgIcon from '../utils/createSvgIcon';

const OneDriveIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['one-drive'] ? icons['one-drive'].icon({ classes }) : null),
  displayName: 'OneDriveIcon',
});

export default OneDriveIcon;
