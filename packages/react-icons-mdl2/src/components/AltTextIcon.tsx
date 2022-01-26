import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AltTextIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 704q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45zM0 256h2048v1024h-128V384H128v677l448-447 640 640 256-256 283 282h-182l-101-102-101 102h-310L576 794l-448 449v421h512v128H0V256zm768 1792v-640h1280v640H768zm128-512v384h1024v-384H896zm256 256v-128h512v128h-512z" />
    </svg>
  ),
  displayName: 'AltTextIcon',
});

export default AltTextIcon;
