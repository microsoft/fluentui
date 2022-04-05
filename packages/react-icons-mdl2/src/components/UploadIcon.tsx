import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UploadIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 0v128H384V0h1152zm45 979l-90 90-467-470v1449H896V599l-467 470-90-90 621-626 621 626z" />
    </svg>
  ),
  displayName: 'UploadIcon',
});

export default UploadIcon;
