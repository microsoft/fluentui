import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReadIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 120l1024 512v1288H0V632l1024-512zm873 580l-873-436-873 436 324 324h1098l324-324zM128 1792h1792V859l-293 293H421L128 859v933z" />
    </svg>
  ),
  displayName: 'ReadIcon',
});

export default ReadIcon;
