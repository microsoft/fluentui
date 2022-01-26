import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TaskGroupIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v896H0V256h2048zm-128 128H128v640h1792V384zm-128 256H768V512h1024v128zm-384 256H768V768h640v128zm-768 0H256V512h384v384zM512 640H384v128h128V640zm-256 640h1536v128H256v-128zm256 256h1024v128H512v-128z" />
    </svg>
  ),
  displayName: 'TaskGroupIcon',
});

export default TaskGroupIcon;
