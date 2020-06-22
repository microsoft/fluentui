import createSvgIcon from '../utils/createSvgIcon';

const OneDriveIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['onedrive'] ? icons['onedrive'].icon({ classes }) : null),
  displayName: 'OneDriveIcon',
});

export default OneDriveIcon;
