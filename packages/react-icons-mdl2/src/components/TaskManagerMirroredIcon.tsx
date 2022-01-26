import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TaskManagerMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1792H0V128zm1920 128H128v256h1792V256zM128 1792h1792V640H128v1152zm1280-640V768h384v384h-384zm128-256v128h128V896h-128zm-128 768v-384h384v384h-384zm128-256v128h128v-128h-128zM384 1024V896h768v128H384zm0 512v-128h768v128H384z" />
    </svg>
  ),
  displayName: 'TaskManagerMirroredIcon',
});

export default TaskManagerMirroredIcon;
