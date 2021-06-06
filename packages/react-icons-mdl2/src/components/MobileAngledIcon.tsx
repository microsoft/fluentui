import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MobileAngledIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 2048h-129l-127-974q-3-26-10-52t-27-46l-447-444 33 398 88 88q43 43 88 89l-90 90-370-369q-28-28-67-28-19 0-36 7t-30 21-20 30-8 36q0 39 28 67l164 165v154q0 66 23 123t65 99 98 68 122 29v6q0 3-1 6 0 16 2 35t4 38 5 39 2 35q0 35-13 64t-36 51-53 34-65 13H155q-32 0-60-11t-50-31-33-47-12-61v-13q0-6 2-13L239 220q4-23 19-40t35-28 44-18 44-6h766q20 0 43 5t43 17 34 29 16 41l9 115 552 550q36 36 52 79t23 94l129 990zM1201 790l-44-533q-3-1-10-1H381q-5 0-9 1t-10 2L128 1764v6q0 11 8 16t19 6h1086q14 0 26-8t13-24q0-13-1-26t-3-27q-52-15-97-42t-84-64-66-82-46-96q-16-46-19-89t-4-89v-67l-127-126q-32-32-48-72t-17-86q0-46 17-86t48-71 70-47 87-18q37 0 65 9t53 25 46 37 47 47zm-625 874v-128h256v128H576z" />
    </svg>
  ),
  displayName: 'MobileAngledIcon',
});

export default MobileAngledIcon;
