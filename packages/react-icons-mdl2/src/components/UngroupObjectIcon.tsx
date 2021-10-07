import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UngroupObjectIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 896v896h128v256h-256v-128H896v128H640v-256h128v-512H256v128H0v-256h128V256H0V0h256v128h896V0h256v256h-128v512h512V640h256v256h-128zM768 1152V896H640V640h256v128h256V256H256v896h512zm128-256v256h256V896H896zm896 0h-512v256h128v256h-256v-128H896v512h896V896z" />
    </svg>
  ),
  displayName: 'UngroupObjectIcon',
});

export default UngroupObjectIcon;
