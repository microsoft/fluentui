import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EventDateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1792H0V128h384V0h128v128h1024V0h128v128h384zM128 256v256h1792V256h-256v128h-128V256H512v128H384V256H128zm1792 1536V640H128v1152h1792zm-512-896v640h-128v-486q-27 14-62 26t-66 12V960q12 0 31-6t39-15 36-21 22-21v-1h128zm-384 192q0 39-11 70t-31 58-44 51-51 46-51 46-47 49h235v128H640v-36q0-19-1-38t4-38 10-36q11-27 33-53t50-53 55-51 51-49 39-47 15-47q0-27-19-45t-45-19q-23 0-40 14t-23 37l-125-26q6-33 23-61t44-48 57-32 64-12q40 0 75 15t61 41 41 61 15 75z" />
    </svg>
  ),
  displayName: 'EventDateIcon',
});

export default EventDateIcon;
