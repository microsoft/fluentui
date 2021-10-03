import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FullWidthIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1536H0V256h2048zm-128 128h-384v256h-128V384H640v256H512V384H128v1280h384v-128h128v128h768v-128h128v128h384V384zM512 768h128v256H512V768zm0 384h128v256H512v-256zm896-384h128v256h-128V768zm0 384h128v256h-128v-256z" />
    </svg>
  ),
  displayName: 'FullWidthIcon',
});

export default FullWidthIcon;
