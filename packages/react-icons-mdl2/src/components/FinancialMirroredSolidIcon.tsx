import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FinancialMirroredSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1898l-384-384v534h384v-150zm-512-512l-384-384v1046h384v-662zM256 896H128v1152h384v-918L256 896zm448 426l-64-64v790h384V1002l-320 320zM0 256v512h128V475l576 575 384-384 960 961v-182l-960-959-384 384-485-486h293V256H0z" />
    </svg>
  ),
  displayName: 'FinancialMirroredSolidIcon',
});

export default FinancialMirroredSolidIcon;
