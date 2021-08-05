import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TableGroupIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 512h1664v1536H384V512zm512 1408v-256H512v256h384zm0-384v-256H512v256h384zm0-384V896H512v256h384zm512 768v-256h-384v256h384zm0-384v-256h-384v256h384zm0-384V896h-384v256h384zm512 768v-256h-384v256h384zm0-384v-256h-384v256h384zm0-384V896h-384v256h384zm0-384V640H512v128h1408zM128 384v256h128v128H128v256h128v128H128v256h128v128H0V0h1664v384H128zm0-256v128h1408V128H128z" />
    </svg>
  ),
  displayName: 'TableGroupIcon',
});

export default TableGroupIcon;
