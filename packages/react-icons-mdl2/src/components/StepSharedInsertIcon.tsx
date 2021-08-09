import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StepSharedInsertIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 768v1152H896v-256H128v-640h512V640h512V256h768v512h128zM896 1536v-256h512V768h384V384h-512v384H768v384H256v384h640zm1024-640h-384v512h-512v384h896V896zM518 384H0V256h518L355 93l90-90 317 317-317 317-90-90 163-163z" />
    </svg>
  ),
  displayName: 'StepSharedInsertIcon',
});

export default StepSharedInsertIcon;
