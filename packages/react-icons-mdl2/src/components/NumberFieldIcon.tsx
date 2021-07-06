import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NumberFieldIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1280H640v-75q0-38 14-73 11-28 33-54t50-53 55-50 51-49 38-47 15-47q0-26-19-45t-45-19q-23 0-40 14t-23 37l-125-26q6-33 23-61t44-48 57-32 64-12q40 0 75 15t61 41 41 61 15 75q0 39-11 70t-31 58-44 51-51 46-51 46-47 49h235v128zM2048 256v1408H0V256h2048zm-128 128H128v1152h1792V384zM397 787q-29 17-68 31t-73 14V704q11 0 31-6t40-15 36-21 22-22h127v640H397V787zm923 493q-42 0-81-14t-75-37v-127q20 15 35 26t32 18 34 10 45 3q22 0 42-4t35-15 25-28 9-42q0-31-24-44t-56-18-65-3-53 2v-97h58q31 0 58-7t45-26 18-57q0-42-25-56t-64-14q-40 0-69 18t-58 43V681q34-23 76-32t82-9q36 0 70 10t60 29 43 49 16 69q0 48-19 85t-62 61q44 15 72 53t28 85q0 47-20 84t-52 62-75 39-85 14z" />
    </svg>
  ),
  displayName: 'NumberFieldIcon',
});

export default NumberFieldIcon;
