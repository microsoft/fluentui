import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HospitalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 768v256H640v256h256v256h256v-256h256v-256h-256V768H896zm384 128h256v512h-256v256H768v-256H512V896h256V640h512v256zm576-512q40 0 75 15t61 41 41 61 15 75v1152q0 40-15 75t-41 61-61 41-75 15H192q-40 0-75-15t-61-41-41-61-15-75V576q0-40 15-75t41-61 61-41 75-15h320q0-37-1-82t9-83 37-65 83-26h768q37 0 61 12t38 32 20 46 9 55 1 57-1 54h320zm-1216 0h768V256H640v128zm1280 192q0-26-19-45t-45-19H192q-26 0-45 19t-19 45v1152q0 26 19 45t45 19h1664q26 0 45-19t19-45V576z" />
    </svg>
  ),
  displayName: 'HospitalIcon',
});

export default HospitalIcon;
