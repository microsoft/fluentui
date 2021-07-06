import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PictureCenterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1536H256V384h1536v1152zM384 512v486l352-352 448 447 192-191 288 287V512H384zm0 896h933L736 827l-352 351v230zm1280 0v-37l-288-288-102 101 225 224h165zm-192-640q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM2048 0v2048H0V0h2048zm-128 128H128v1792h1792V128z" />
    </svg>
  ),
  displayName: 'PictureCenterIcon',
});

export default PictureCenterIcon;
