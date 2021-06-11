import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriangleSolidRight12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0l2048 1024L0 2048V0z" />
    </svg>
  ),
  displayName: 'TriangleSolidRight12Icon',
});

export default TriangleSolidRight12Icon;
