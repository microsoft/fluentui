import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ToolboxIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 512h640v1152H0V512h640V256h768v256zM768 384v128h512V384H768zm1152 256H128v256h384V768h128v128h768V768h128v128h384V640zM128 1536h1792v-512h-384v128h-128v-128H640v128H512v-128H128v512z" />
    </svg>
  ),
  displayName: 'ToolboxIcon',
});

export default ToolboxIcon;
