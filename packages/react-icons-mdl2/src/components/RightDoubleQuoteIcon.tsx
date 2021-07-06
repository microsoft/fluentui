import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RightDoubleQuoteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 875 2048" className={classes.svg} focusable="false">
      <path d="M0 66h332v343q0 51-7 105t-23 104-41 96-62 78-84 53T5 865V708q37 0 64-14t47-38 30-55 18-64 9-66 3-62H0V66zm875 0v343q0 78-16 159t-54 147-100 108-157 42V708q55 0 89-30t53-76 25-98 7-95H546V66h329z" />
    </svg>
  ),
  displayName: 'RightDoubleQuoteIcon',
});

export default RightDoubleQuoteIcon;
