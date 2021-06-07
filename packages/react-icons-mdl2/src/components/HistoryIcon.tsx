import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HistoryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 512v549l365 366-90 90-403-402V512h128zm944 113q80 192 80 399t-80 399q-78 183-220 325t-325 220q-192 80-399 80-174 0-336-57-158-55-289-156-130-101-223-238-47-69-81-144t-57-156l123-34q40 145 123 266t198 208 253 135 289 48q123 0 237-32t214-90 182-141 140-181 91-214 32-238q0-123-32-237t-90-214-141-182-181-140-214-91-238-32q-130 0-252 36T545 268 355 429 215 640h297v128H0V256h128v274q17-32 37-62t42-60q94-125 220-216Q559 98 710 49t314-49q207 0 399 80 183 78 325 220t220 325z" />
    </svg>
  ),
  displayName: 'HistoryIcon',
});

export default HistoryIcon;
