import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SunAddIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 512q93 0 174 35t143 96 96 142 35 175q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35zm0 768q66 0 124-25t101-68 69-102 26-125q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25zm64-896H896V0h128v384zM896 1536h128v384H896v-384zm640-640h384v128h-384V896zM384 1024H0V896h384v128zm123-426L236 326l90-90 272 271-91 91zm906 0l-91-91 272-271 90 90-271 272zm-906 724l91 91-272 271-90-90 271-272zm1541 470h-256v256h-128v-256h-256v-128h256v-256h128v256h256v128z" />
    </svg>
  ),
  displayName: 'SunAddIcon',
});

export default SunAddIcon;
