import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ForwardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2042 1024l-941 941-90-90 787-787H0V960h1798l-787-787 90-90 941 941z" />
    </svg>
  ),
  displayName: 'ForwardIcon',
});

export default ForwardIcon;
