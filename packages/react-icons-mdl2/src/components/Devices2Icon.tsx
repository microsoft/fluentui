import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Devices2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1663q0 27-10 50t-27 41-41 28-50 10H896q-27 0-50-10t-40-27-28-41-10-50v-128H122q-25 0-47-9t-39-26-26-39-10-48q0-35 11-70t36-61l209-220V256h1408v512h256q26 0 49 10t40 27 28 40 11 49v769zM768 1408v-256H348l-206 217q-6 7-9 18t-5 21h640zm0-512q0-27 10-50t27-40 41-28 50-10h640V384H384v640h384V896zm1152 768V896H896v768h1024zm-640-256h256v128h-256v-128z" />
    </svg>
  ),
  displayName: 'Devices2Icon',
});

export default Devices2Icon;
