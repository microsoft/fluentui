import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NewMailIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1280v256h256v128h-256v256h-128v-256h-256v-128h256v-256h128zM0 384h2048v896h-128V648l-896 447-896-447v888h1024v128H0V384zm143 128l881 441 881-441H143z" />
    </svg>
  ),
  displayName: 'NewMailIcon',
});

export default NewMailIcon;
