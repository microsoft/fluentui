import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1875 1037l-787-787v1798H960V250l-787 787-90-90L1024 6l941 941-90 90z" />
    </svg>
  ),
  displayName: 'UpIcon',
});

export default UpIcon;
