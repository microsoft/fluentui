import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const VisioDiagramIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 768v512h-896v-256H979l-339 226v158h384v512H128v-512h384v-158L77 960l435-290V512H384q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55T384 0h384q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20H640v158l339 226h173V768h896zM768 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10H384q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10h384zM256 1536v256h640v-256H256zm589-576L576 781 307 960l269 179 269-179zm1075-64h-640v256h640V896z" />
    </svg>
  ),
  displayName: 'VisioDiagramIcon',
});

export default VisioDiagramIcon;
