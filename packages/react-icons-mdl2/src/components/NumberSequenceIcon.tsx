import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NumberSequenceIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 476q-29 17-61 26t-67 10V384q27 0 50-10t40-27 28-41 10-50h128v640h-128V476zm192 1316h-384v-25q0-12-1-26 0-25 3-49t12-48q11-28 33-54t49-52 55-50 52-49 38-48 15-47q0-27-19-45t-45-19q-23 0-40 14t-23 37l-125-26q6-33 23-61t44-48 57-32 64-12q40 0 75 15t61 41 41 61 15 75q0 59-25 102t-61 79-77 68-72 71h235v128zM525 894H411l235-628h117l234 628H882l-56-160H579l-54 160zm176-535q-2 11-3 21t-5 19l-87 250h193l-88-250q-3-9-5-19t-5-21zM525 1790H411l235-628h117l234 628H882l-56-160H579l-54 160zm176-535q-2 11-3 21t-5 19l-87 250h193l-88-250q-3-9-5-19t-5-21zm837-238q21 0 34-12t20-29 9-38 3-36h-68V770h128v132q0 30-6 61t-21 56-39 42-60 16v-60zM2048 0v2048H0V0h2048zm-128 128H128v1792h1792V128z" />
    </svg>
  ),
  displayName: 'NumberSequenceIcon',
});

export default NumberSequenceIcon;
