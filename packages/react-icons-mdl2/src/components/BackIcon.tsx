import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BackIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1088H250l787 787-90 90L6 1024 947 83l90 90-787 787h1798v128z" />
    </svg>
  ),
  displayName: 'BackIcon',
});

export default BackIcon;
