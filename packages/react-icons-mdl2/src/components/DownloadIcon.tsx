import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DownloadIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 2048v-128h1152v128H384zm1197-979l-621 626-621-626 90-90 467 470V0h128v1449l467-470 90 90z" />
    </svg>
  ),
  displayName: 'DownloadIcon',
});

export default DownloadIcon;
