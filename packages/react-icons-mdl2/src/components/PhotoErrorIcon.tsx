import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PhotoErrorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 1600v-320h128v320h-128zm0 192v-128h128v128h-128zM0 128h2048v1434l-128-256V256H128v677l448-447 572 572-60 120-512-512-448 449v421h781l-64 128H0V128zm1600 384q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM896 1920l576-1152 576 1152H896zm181-112h790l-395-790-395 790z" />
    </svg>
  ),
  displayName: 'PhotoErrorIcon',
});

export default PhotoErrorIcon;
