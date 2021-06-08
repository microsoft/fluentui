import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TaskGroupMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256v896h2048V256H0zm128 128h1792v640H128V384zm128 256h1024V512H256v128zm384 256h640V768H640v128zm768 0h384V512h-384v384zm128-256h128v128h-128V640zm256 640H256v128h1536v-128zm-256 256H512v128h1024v-128z" />
    </svg>
  ),
  displayName: 'TaskGroupMirroredIcon',
});

export default TaskGroupMirroredIcon;
