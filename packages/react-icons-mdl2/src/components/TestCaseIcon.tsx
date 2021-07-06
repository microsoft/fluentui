import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TestCaseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1001 1536H0V0h1536v768h-128V128H128v1280h937l-64 128zm962 327q14 28 14 57 0 26-10 49t-27 41-41 28-50 10h-754q-26 0-49-10t-41-27-28-41-10-50q0-29 14-57l299-598v-241h-128V896h640v128h-128v241l299 598zm-242-199l-185-369v-271h-128v271l-185 369h498zM576 998l627-627 90 90-717 717-333-333 90-90 243 243z" />
    </svg>
  ),
  displayName: 'TestCaseIcon',
});

export default TestCaseIcon;
