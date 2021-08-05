import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const AdminIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 896v384q0 170-88 328-68 121-190 231-48 44-94 78t-84 57-62 36-31 16l-27 13q-20-10-23-12t-5-2l-30-15q-24-12-62-36t-84-56-95-78q-60-55-107-112t-82-120q-88-158-88-328V896h64q62 0 107-6t79-15 61-22 51-26q21-11 43-21t48-19 56-14 67-5q37 0 67 5t55 13 48 19 44 22q24 13 50 25t61 22 80 16 107 6h64zm-128 126q-57-3-101-11t-79-20-62-25-51-25q-19-10-36-18t-35-14-38-9-46-4q-26 0-46 3t-38 10-35 14-36 18q-24 12-51 25t-62 24-79 20-101 12v258q0 87 26 162t67 139 93 116 101 91 93 67 68 41q16-9 39-23t52-33 61-44 64-54q232-211 232-462v-258zM128 1152h640v128H0V256h1792v412q-11-4-21-8t-19-9q-20-14-42-24t-46-19V384H128v768z" />
    </svg>
  ),
  displayName: 'AdminIcon',
});

export default AdminIcon;
