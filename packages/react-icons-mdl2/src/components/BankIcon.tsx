import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BankIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 768v768q0 1 9 27t22 67 30 89 30 90 24 73 13 38H0q2-7 12-37t25-73 30-91 29-88 23-67 9-28V768H0V640l960-480 960 480v128h-128zM286 640h1348L960 303 286 640zm1250 128v768h128V768h-128zm-256 0v768h128V768h-128zm-256 0v768h128V768h-128zm-256 0v768h128V768H768zm-256 0v768h128V768H512zm-256 768h128V768H256v768zm1486 256l-42-128H220l-42 128h1564z" />
    </svg>
  ),
  displayName: 'BankIcon',
});

export default BankIcon;
