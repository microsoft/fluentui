import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BrowserScreenShotIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v896h-128V640H128v1024h512v128H0V128h2048zm-128 384V256H128v256h1792zm-165 640h293v896H768v-896h293l128-128h438l128 128zm165 128h-219l-128-128h-330l-128 128H896v640h1024v-640zm-512 0q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20zm0 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10z" />
    </svg>
  ),
  displayName: 'BrowserScreenShotIcon',
});

export default BrowserScreenShotIcon;
