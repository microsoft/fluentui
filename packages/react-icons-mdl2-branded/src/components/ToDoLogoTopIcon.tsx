import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ToDoLogoTopIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 640L853 1835l-400-400L1648 240l400 400z" />
    </svg>
  ),
  displayName: 'ToDoLogoTopIcon',
});

export default ToDoLogoTopIcon;
