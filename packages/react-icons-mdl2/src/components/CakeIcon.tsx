import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CakeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1216 256q-26 0-45-19t-19-45q0-12 8-31t18-40 21-40 17-30q6 11 16 30t21 40 19 40 8 31q0 26-19 45t-45 19zm832 640v1152H0V896l1152-384V352q0-9 7-15t18-10 21-5 18-2q7 0 17 1t21 5 18 10 8 16v117l256-85 512 512zm-832-128q-7 0-17-1t-21-5-18-10-8-16v-89L405 896h1462l-366-366-221 74v132q0 9-7 15t-18 10-21 5-18 2zM128 1024v384h1792v-384H128zm1792 896v-384H128v384h1792z" />
    </svg>
  ),
  displayName: 'CakeIcon',
});

export default CakeIcon;
