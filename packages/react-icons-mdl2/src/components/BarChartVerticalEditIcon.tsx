import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BarChartVerticalEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 384v641l-128 128V256h384v531q-39 22-67 50t-61 61V384h-128zM640 512v1152H256V512h384zM512 1536V640H384v896h128zm1536-442q0 39-15 76t-43 65l-717 717-377 94 94-377 717-716q29-29 64-43t77-14q42 0 78 15t64 41 42 63 16 79zm-128 0q0-32-20-51t-52-19q-14 0-27 4t-23 15l-692 692-34 135 135-34 692-691q21-21 21-51zM896 1536h1l-25 25q-12 12-27 26-5 20-9 39t-10 38h-58V768h384v513l-127 127h-1V896H896v640zM128 128v1664h666l-32 128H0V128h128z" />
    </svg>
  ),
  displayName: 'BarChartVerticalEditIcon',
});

export default BarChartVerticalEditIcon;
