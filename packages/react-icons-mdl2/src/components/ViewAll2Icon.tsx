import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ViewAll2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 0v896H0V0h896zM768 768V128H128v640h640zM0 1920v-896h1920v896H0zm128-768v640h1664v-640H128zM1024 0h896v896h-896V0zm768 768V128h-640v640h640z" />
    </svg>
  ),
  displayName: 'ViewAll2Icon',
});

export default ViewAll2Icon;
