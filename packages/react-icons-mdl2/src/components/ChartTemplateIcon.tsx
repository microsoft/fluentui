import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChartTemplateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 0v128H0V0h128zm0 256v128H0V256h128zm0 256v128H0V512h128zm0 256v128H0V768h128zm0 256v128H0v-128h128zm0 256v128H0v-128h128zm0 256v128H0v-128h128zM0 1792h128v128H0v-128zm128 256v-128h128v128H128zM384 0v128H256V0h128zm0 2048v-128h128v128H384zm256 0v-128h128v128H640zM640 0v128H512V0h128zm256 0v128H768V0h128zm256 0v128h-128V0h128zm256 0v128h-128V0h128zm128 256h-128V128h128v128zm0 128v128h-128V384h128zm-128 384V640h128v128h-128zm0 256V896h128v128h-128zm-256 256v-128h512v128h-512zm-128 640h896v128H896V1024h128v896zm128-512h384v128h-384v-128zm0 384v-128h640v128h-640z" />
    </svg>
  ),
  displayName: 'ChartTemplateIcon',
});

export default ChartTemplateIcon;
