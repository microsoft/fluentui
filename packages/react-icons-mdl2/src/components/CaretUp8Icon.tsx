import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretUp8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 512l1024 1024H0L1024 512zm0 362l-406 406h812l-406-406z" />
    </svg>
  ),
  displayName: 'CaretUp8Icon',
});

export default CaretUp8Icon;
