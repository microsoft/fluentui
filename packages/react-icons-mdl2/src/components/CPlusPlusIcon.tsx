import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CPlusPlusIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v1792H128V128h1792zm-119 119H247v1554h1554V247zm-521 1033v-256h128v256h256v128h-256v256h-128v-256h-256v-128h256zm-640-256H384V896h256V640h128v256h256v128H768v256H640v-256z" />
    </svg>
  ),
  displayName: 'CPlusPlusIcon',
});

export default CPlusPlusIcon;
