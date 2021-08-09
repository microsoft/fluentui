import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TableIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 256h1664v1536H128V256zm640 768v256h384v-256H768zm384-128V640H768v256h384zm-512 0V640H256v256h384zm-384 128v256h384v-256H256zm384 640v-256H256v256h384zm512 0v-256H768v256h384zm512 0v-256h-384v256h384zm0-384v-256h-384v256h384zm0-384V640h-384v256h384zM256 512h1408V384H256v128z" />
    </svg>
  ),
  displayName: 'TableIcon',
});

export default TableIcon;
