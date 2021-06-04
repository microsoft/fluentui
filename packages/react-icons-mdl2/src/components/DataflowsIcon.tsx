import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DataflowsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 0h640v640h-256v512H512v256h256v640H128v-640h256V640H128V0h640v640H512v384h1024V640h-256V0zM256 512h384V128H256v384zm384 1408v-384H256v384h384zM1792 512V128h-384v384h384z" />
    </svg>
  ),
  displayName: 'DataflowsIcon',
});

export default DataflowsIcon;
