import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BuildQueueNewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v1024h-512v512h-512v512H0V1024h512V512h512V0h1024zM896 1152H128v768h768v-768zm512-512H640v384h384v384h384V640zm512-512h-768v384h384v384h384V128zm-128 1536h256v128h-256v256h-128v-256h-256v-128h256v-256h128v256z" />
    </svg>
  ),
  displayName: 'BuildQueueNewIcon',
});

export default BuildQueueNewIcon;
