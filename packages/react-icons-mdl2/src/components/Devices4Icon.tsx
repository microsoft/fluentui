import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Devices4Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1664h-256v256H896v-256H640v-640q0-27 10-50t27-40 41-28 50-10h128V512h640V256H384v640h162q-34 60-34 128H347l-211 211q-8 8-8 19t7 18 19 8h358v128H154q-32 0-60-12t-49-33-33-49-12-60q0-31 11-59t34-51l211-211V128h1408v384h128v384h128q27 0 50 10t40 27 28 41 10 50v640zM1024 896h640V640h-640v256zm640 640h-640v256h640v-256zm256-512H768v512h128v-128h896v128h128v-512zm-960 256q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19z" />
    </svg>
  ),
  displayName: 'Devices4Icon',
});

export default Devices4Icon;
