import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CancelIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1115 1024l690 691-90 90-691-690-691 690-90-90 690-691-690-691 90-90 691 690 691-690 90 90-690 691z" />
    </svg>
  ),
  displayName: 'CancelIcon',
});

export default CancelIcon;
