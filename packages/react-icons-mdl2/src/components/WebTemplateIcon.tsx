import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WebTemplateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 896h1280v1152H768V896zm1152 1024v-640H896v640h1024zm0-768v-128H896v128h1024zM128 0v128H0V0h128zm0 256v128H0V256h128zm0 256v128H0V512h128zm0 256v128H0V768h128zm0 256v128H0v-128h128zm0 256v128H0v-128h128zm0 256v128H0v-128h128zM0 1792h128v128H0v-128zm128 256v-128h128v128H128zM384 0v128H256V0h128zm0 2048v-128h128v128H384zM512 128V0h128v128H512zM896 0v128H768V0h128zm256 0v128h-128V0h128zm256 0v128h-128V0h128zm128 256h-128V128h128v128zm0 128v128h-128V384h128zm-128 384V640h128v128h-128z" />
    </svg>
  ),
  displayName: 'WebTemplateIcon',
});

export default WebTemplateIcon;
