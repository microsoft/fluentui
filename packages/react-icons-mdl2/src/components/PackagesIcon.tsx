import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PackagesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1024h-128v1024H640V1024H512V640h768V384H256v896h384v128H128V384H0V0h1536v384h-128v256h640v384zM128 256h1280V128H128v128zm1664 768H768v896h1024v-896zm128-256H640v128h1280V768zm-512 768H896v-128h512v128zm-512 256v-128h384v128H896z" />
    </svg>
  ),
  displayName: 'PackagesIcon',
});

export default PackagesIcon;
