import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DesktopScreenshotIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 1536v128h256v128H768v-128h256v-128H128v-384h128v256h1664V512h-512V384h640v1152h-896zm128-512H0V128h293L421 0h438l128 128h293v896zm-128-768H933L805 128H475L347 256H128v640h1024V256zm-512 0q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20zm0 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10z" />
    </svg>
  ),
  displayName: 'DesktopScreenshotIcon',
});

export default DesktopScreenshotIcon;
