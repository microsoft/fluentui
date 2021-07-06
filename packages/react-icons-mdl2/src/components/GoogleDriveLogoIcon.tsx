import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GoogleDriveLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1995 1261h-646L699 128h646l650 1133zm-1186 93h1239l-323 566H487l322-566zM619 270l323 566-619 1084L0 1354 619 270z" />
    </svg>
  ),
  displayName: 'GoogleDriveLogoIcon',
});

export default GoogleDriveLogoIcon;
