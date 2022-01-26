import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TaskListIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 256h1280v128H768V256zm0 768V896h1280v128H768zm0 640v-128h1280v128H768zM256 768q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20zm0 400q30 0 56-11t45-31 31-46 12-56q0-30-11-56t-31-45-46-31-56-12q-30 0-56 11t-45 31-31 46-12 56q0 30 11 56t31 45 46 31 56 12zm0 240q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20zm0 400q30 0 56-11t45-31 31-46 12-56q0-30-11-56t-31-45-46-31-56-12q-30 0-56 11t-45 31-31 46-12 56q0 30 11 56t31 45 46 31 56 12zM192 358L467 83l90 90-365 365L19 365l90-90 83 83z" />
    </svg>
  ),
  displayName: 'TaskListIcon',
});

export default TaskListIcon;
