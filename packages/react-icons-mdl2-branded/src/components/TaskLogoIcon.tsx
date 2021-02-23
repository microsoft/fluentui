import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const TaskLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1894 387q0 12-8 22L994 1557 372 886q-9-9-9-24 0-16 11-27l147-136q10-10 25-10t26 11l404 435 695-893q11-14 28-14 12 0 23 8l158 123q14 12 14 28zm-230 1405V974l128-164v1110H128V256h1329l-100 128H256v1408h1408z" />
    </svg>
  ),
  displayName: 'TaskLogoIcon',
});

export default TaskLogoIcon;
