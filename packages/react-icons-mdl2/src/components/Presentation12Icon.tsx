import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Presentation12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1877 0v171h-170v853q0 35-13 66t-37 55-55 36-66 14h-512v512h341v170H512v-170h341v-512H341q-35 0-66-13t-54-37-36-54-14-67V171H0V0h1877zm-341 1024V171H341v853h1195zm-171-512v171H512V512h853z" />
    </svg>
  ),
  displayName: 'Presentation12Icon',
});

export default Presentation12Icon;
