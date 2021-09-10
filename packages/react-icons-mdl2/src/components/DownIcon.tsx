import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1965 1101l-941 941-941-941 90-90 787 787V0h128v1798l787-787 90 90z" />
    </svg>
  ),
  displayName: 'DownIcon',
});

export default DownIcon;
