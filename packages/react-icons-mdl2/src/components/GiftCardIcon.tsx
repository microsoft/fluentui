import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GiftCardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1936 256q23 0 43 9t36 24 24 35 9 44v1184q0 23-9 43t-24 36-35 24-44 9H112q-23 0-43-9t-36-24-24-35-9-44V368q0-23 9-43t24-36 35-24 44-9h1824zm-16 128H640v139q33-11 64-11 40 0 75 15t61 41 41 61 15 75q0 31-11 64h1035V384zM384 704q0 26 19 45t45 19h64v-64q0-26-19-45t-45-19q-26 0-45 19t-19 45zm320 64q26 0 45-19t19-45q0-26-19-45t-45-19q-26 0-45 19t-19 45v64h64zM128 384v384h139q-11-33-11-64 0-40 15-75t41-61 61-41 75-15q31 0 64 11V384H128zm0 1152h384V987l-147 146-90-90 146-147H128v640zm1792 0V896H731l146 147-90 90-147-146v549h1280z" />
    </svg>
  ),
  displayName: 'GiftCardIcon',
});

export default GiftCardIcon;
