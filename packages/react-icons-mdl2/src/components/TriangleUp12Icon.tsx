import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriangleUp12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0l1024 2048H0L1024 0zm0 382L276 1877h1496L1024 382z" />
    </svg>
  ),
  displayName: 'TriangleUp12Icon',
});

export default TriangleUp12Icon;
