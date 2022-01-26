import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ScopeTemplateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1792h512v128H128V0h1792v768h-128V512H256v1280zm0-1664v256h1536V128H256zm640 768h384v128h-256v256H896V896zm1152 0v384h-128v-256h-256V896h384zM1024 1920h256v128H896v-384h128v256zm896-256h128v384h-384v-128h256v-256z" />
    </svg>
  ),
  displayName: 'ScopeTemplateIcon',
});

export default ScopeTemplateIcon;
