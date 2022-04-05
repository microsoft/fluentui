import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TaskManagerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1792H0V128zm1920 128H128v256h1792V256zM128 1792h1792V640H128v1152zm128-640V768h384v384H256zm128-256v128h128V896H384zm-128 768v-384h384v384H256zm128-256v128h128v-128H384zm512-384V896h768v128H896zm0 512v-128h768v128H896z" />
    </svg>
  ),
  displayName: 'TaskManagerIcon',
});

export default TaskManagerIcon;
