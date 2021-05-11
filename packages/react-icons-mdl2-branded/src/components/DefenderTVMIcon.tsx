import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const DefenderTVMIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1664 1408h-256v256h128v384H384v-384h128v-256H256V896h384v128h128V768h128V31l674 289-546 234v214h128v256h128V896h384v512zM1024 225v190l222-95-222-95zm384 1695v-128H512v128h896zm-768-256h640v-256H640v256zm-256-384h1152v-256h-128v128h-384V896H896v256H512v-128H384v256z" />
    </svg>
  ),
  displayName: 'DefenderTVMIcon',
});

export default DefenderTVMIcon;
