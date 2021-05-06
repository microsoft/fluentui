import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ToDoLogoInverseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M384 512l384 384-384 384L0 896l384-384zm1280-256l384 384L896 1792l-384-384L1664 256z" />
    </svg>
  ),
  displayName: 'ToDoLogoInverseIcon',
});

export default ToDoLogoInverseIcon;
