import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const LyncLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1389 797q-29 0-57 4t-52 23V638q13-2 24-6t25-7q-3-5-11-14t-17-20-14-21-7-18v-46q0-14 7-25t19-18 26-12 26-4q17 0 33 7t27 22l244 321h-273zm659 220q0 69-23 133t-65 115-99 87-127 47q16 22 33 44t17 51q0 34-23 58t-58 24q-21 0-34-6t-26-24l-244-314q71 1 141 1t142 1q11 0 26-3t25-8q33-11 59-32t46-48 30-59 11-67q0-38-12-75t-37-67q-8-10-9-11t-2-2-2 0-10-11l-182-220h76v-1q75 5 138 38t110 87 73 121 26 141zm-768 187l156 197h-69q-26 0-45-5t-42-19v-173zM64 272L1216 67v1914L64 1782V272zm402 1122l389 22-2-143-257-4V626l-130 16v752z" />
    </svg>
  ),
  displayName: 'LyncLogoIcon',
});

export default LyncLogoIcon;
