import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DefectSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1192 42q107 37 194 102t149 152 95 191 34 217q0 144-55 267t-156 226q-71 73-113 155t-53 184H633q-11-102-52-184t-113-154q-100-103-156-226t-56-268q0-97 25-187t71-169 110-142T604 96t168-71T960 0q11 0 21 1t22 3L623 384l448 448-263 263 113 114 376-377-448-448 343-342zM640 1664h640v192q0 40-15 75t-41 61-61 41-75 15H832q-40 0-75-15t-61-41-41-61-15-75v-192z" />
    </svg>
  ),
  displayName: 'DefectSolidIcon',
});

export default DefectSolidIcon;
