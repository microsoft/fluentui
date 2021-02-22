import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ToDoLogoOutlineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2023 540q25 27 25 60 0 35-25 60L872 1811q-12 13-27 19t-33 6q-35 0-60-25l-636-636q-13-12-19-27t-6-33q0-35 25-60l303-304q27-25 60-25 35 0 60 25l273 273 787-787q13-13 28-19t32-6q17 0 32 6t29 19l303 303zM237 1115l242 242 243-242-243-243-242 243zm575 575L1902 600l-243-242L570 1448l7 7 235 235z" />
    </svg>
  ),
  displayName: 'ToDoLogoOutlineIcon',
});

export default ToDoLogoOutlineIcon;
