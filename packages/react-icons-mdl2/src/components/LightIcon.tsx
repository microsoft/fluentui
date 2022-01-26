import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 512q93 0 174 35t142 96 96 142 36 175q0 93-35 174t-96 142-142 96-175 36q-93 0-174-35t-142-96-96-142-36-175q0-93 35-174t96-142 142-96 175-36zm0 768q66 0 124-25t101-69 69-102 26-124q0-66-25-124t-69-101-102-69-124-26q-35 0-64 7v626q29 7 64 7zm64-896H896V0h128v384zM896 1536h128v384H896v-384zm1024-640v128h-384V896h384zM384 1024H0V896h384v128zm123-426L236 326l90-90 272 271-91 91zm906 724l271 272-90 90-272-271 91-91zm0-724l-91-91 272-271 90 90-271 272zm-906 724l91 91-272 271-90-90 271-272z" />
    </svg>
  ),
  displayName: 'LightIcon',
});

export default LightIcon;
