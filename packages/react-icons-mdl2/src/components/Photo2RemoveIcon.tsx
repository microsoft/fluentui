import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Photo2RemoveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 576q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45zm410 1024l227 227-90 90-227-227-227 227-90-90 227-227-227-227 90-90 227 227 227-227 90 90-227 227zm-361 0l-65 64H0V256h1792v1008l-64 65-64-65V384H128v421l192-191 512 512 256-256 323 322-91 91-232-233-166 166 321 320h149l65 64zm-396-64L320 794 128 987v549h933z" />
    </svg>
  ),
  displayName: 'Photo2RemoveIcon',
});

export default Photo2RemoveIcon;
