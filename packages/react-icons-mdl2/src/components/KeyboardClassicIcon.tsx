import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const KeyboardClassicIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1783 384q30 0 55 12t43 31 28 46 11 55v864q0 29-10 55t-29 45-43 32-55 12H137q-30 0-55-12t-43-31-28-46-11-55V528q0-28 10-54t29-46 43-32 55-12h1646zm9 144q0-11-9-16H137q-9 5-9 16v864q0 11 9 16h1646q9-5 9-16V528zM384 768H256V640h128v128zM256 896h256v128H256V896zm1152 0h256v128h-256V896zm0 256h256v128h-256v-128zm-1152 0h256v128H256v-128zm384 0h640v128H640v-128zm0-384H512V640h128v128zm0 128h128v128H640V896zm256 0h128v128H896V896zm256 0h128v128h-128V896zM896 768H768V640h128v128zm256 0h-128V640h128v128zm256 0h-128V640h128v128zm128-128h128v128h-128V640z" />
    </svg>
  ),
  displayName: 'KeyboardClassicIcon',
});

export default KeyboardClassicIcon;
