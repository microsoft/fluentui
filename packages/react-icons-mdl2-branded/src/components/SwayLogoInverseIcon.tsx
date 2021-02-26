import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const SwayLogoInverseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M128 352l1024-224v1792L128 1696V352zm283 1063q5 3 16 8t25 12 26 11 19 7q29 10 60 14t63 5q47 0 89-12t74-37 54-62 28-87v5l1-10-1 5q4-23 4-50 0-51-16-92t-43-76-62-64-73-57q-27-20-40-40t-14-56q0-44 29-67t71-24q15 0 32 3t36 10 34 14 28 18V607q-34-14-68-22t-71-9q-26 0-51 1t-52 8q-47 11-83 35t-60 58-36 75-12 89q0 59 17 99t43 70 55 50 56 42 43 44 17 56q0 45-29 65t-71 20q-46 0-76-15t-62-45v187zM1792 256q26 0 49 10t41 27 28 41 10 50v640l-369-370q-6-6-21-10t-24-4q-20 0-39 14-17 13-32 28t-31 30l-62 60q-31 30-62 61V256h512zm0 128h-128v128h128V384zm-512 640h640v640q0 26-10 49t-27 41-41 28-50 10h-512v-256h128v-128h-128v-128h128v-128h-128v-128zm256 256h256v-128h-256v128zm0 256h256v-128h-256v128z" />
    </svg>
  ),
  displayName: 'SwayLogoInverseIcon',
});

export default SwayLogoInverseIcon;
