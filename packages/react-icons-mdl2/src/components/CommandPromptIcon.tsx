import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CommandPromptIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1664H0V128h2048zM128 256v128h1792V256H128zm1792 1408V512H128v1152h1792zm-528-896l257 640h-91l-257-640h91zm-656 76q-53 0-96 16t-74 48-48 78-17 106q0 55 15 100t45 76 73 49 98 17q35 0 69-7t58-18l16 62q-22 11-63 19t-96 9q-63 0-117-20t-95-58-62-95-23-131q0-70 23-128t64-100 99-65 128-23q57 0 92 9t51 18l-19 63q-22-11-52-18t-69-7zm288 52h128v128h-128V896zm0 256h128v128h-128v-128z" />
    </svg>
  ),
  displayName: 'CommandPromptIcon',
});

export default CommandPromptIcon;
