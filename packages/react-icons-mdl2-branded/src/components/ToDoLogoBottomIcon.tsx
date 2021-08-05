import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ToDoLogoBottomIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M894 1082l-353 353h-89L55 1038l397-397 442 441z" />
    </svg>
  ),
  displayName: 'ToDoLogoBottomIcon',
});

export default ToDoLogoBottomIcon;
