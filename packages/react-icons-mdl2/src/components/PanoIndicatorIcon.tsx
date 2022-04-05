import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PanoIndicatorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1472 896q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM0 279q241 115 499 172t525 58q266 0 524-57t500-173v1488q-241-115-499-173t-525-58q-266 0-524 58T0 1767V279zm128 1298q153-59 311-96t321-54l-312-312-320 319v143zm802-161q24-1 48-1t49-1q197 0 391 30l-330-329-229 229 71 72zm990 18l-192-191-166 165 83 83q70 18 138 39t137 47v-143zm0-965q-215 83-440 127t-456 44q-231 0-456-44T128 469v785l320-321 320 321 320-321 384 384 256-256 192 193V469z" />
    </svg>
  ),
  displayName: 'PanoIndicatorIcon',
});

export default PanoIndicatorIcon;
