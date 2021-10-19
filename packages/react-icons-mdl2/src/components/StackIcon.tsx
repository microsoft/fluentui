import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StackIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 640h256v1152H512v-256H256v-256H0V128h1536v256h256v256zM128 256v896h1280V256H128zm256 1024v128h1280V512h-128v768H384zm1536 384V768h-128v768H640v128h1280z" />
    </svg>
  ),
  displayName: 'StackIcon',
});

export default StackIcon;
