import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PictureStretchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 768h1408v1152H0V768zm128 1024h870l-582-581-288 288v293zm1152 0v-102l-224-223-101 101 223 224h102zM128 896v421l288-287 448 447 192-191 224 224V896H128zm832 256q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zm960-512V347l-339 338-90-90 338-339h-293V128h512v512h-128zm-768-512h256v128h-256V128zm-128 128H768V128h256v128zm-384 0H384V128h256v128zm-384 0H0V128h256v128zM128 640H0V384h128v256zm1920 128v256h-128V768h128zm-128 384h128v256h-128v-256zm0 384h128v256h-128v-256zm-384 256h256v128h-256v-128z" />
    </svg>
  ),
  displayName: 'PictureStretchIcon',
});

export default PictureStretchIcon;
