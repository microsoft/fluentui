import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TrainIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M576 1536q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zm896 0q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM1280 384H768V256h512v128zm165 1408H603l-256 256H165l258-258q-35-4-65-21t-53-42-36-58-13-69V192q0-40 15-75t41-61 61-41 75-15h1152q40 0 75 15t61 41 41 61 15 75v1408q0 36-13 68t-35 58-53 43-66 21l258 258h-182l-256-256zm219-1152H384v512h1280V640zM448 128q-26 0-45 19t-19 45v320h1280V192q0-26-19-45t-45-19H448zm-64 1472q0 26 19 45t45 19h1152q26 0 45-19t19-45v-320H384v320z" />
    </svg>
  ),
  displayName: 'TrainIcon',
});

export default TrainIcon;
