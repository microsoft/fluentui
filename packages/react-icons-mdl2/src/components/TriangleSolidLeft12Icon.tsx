import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriangleSolidLeft12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1024L2048 0v2048L0 1024z" />
    </svg>
  ),
  displayName: 'TriangleSolidLeft12Icon',
});

export default TriangleSolidLeft12Icon;
