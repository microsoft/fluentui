import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShoppingCartSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1600 1536q40 0 75 15t61 41 41 61 15 75q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75q0-31 11-64H885q11 33 11 64 0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75q0-55 29-102t80-71L189 256H0V128h281l85 256h1682l-298 896H665l85 256h850zm-832 192q0-26-19-45t-45-19q-26 0-45 19t-19 45q0 26 19 45t45 19q26 0 45-19t19-45zm832 64q26 0 45-19t19-45q0-26-19-45t-45-19q-26 0-45 19t-19 45q0 26 19 45t45 19z" />
    </svg>
  ),
  displayName: 'ShoppingCartSolidIcon',
});

export default ShoppingCartSolidIcon;
