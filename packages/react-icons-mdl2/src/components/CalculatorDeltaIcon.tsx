import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CalculatorDeltaIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 768v128H769V768h127zm256-512v384H256V256h896zm-128 256V384H384v128h640zm-384 768v128H513v-128h127zm256-256v128H769v-128h127zm129 640v-128h76l-64 128h-12zm-512 0v-128h127v128H513zm383-384v128H769v-128h127zm-127 384v-128h127v128H769zm-513 0v-128h128v128H256zm896-896v128h-127V768h127zm0 512v128h-127v-128h127zm0-256v128h-127v-128h127zm-512 0v128H513v-128h127zM128 128v1664h845l-64 128H0V0h1408v922l-128 256V128H128zm512 640v128H513V768h127zm-256 0v128H256V768h128zm0 512v128H256v-128h128zm0-256v128H256v-128h128zm1152 0l512 1024H1024l512-1024zm0 286l-305 610h610l-305-610z" />
    </svg>
  ),
  displayName: 'CalculatorDeltaIcon',
});

export default CalculatorDeltaIcon;
