import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriangleSolidUp12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0l1024 2048H0L1024 0z" />
    </svg>
  ),
  displayName: 'TriangleSolidUp12Icon',
});

export default TriangleSolidUp12Icon;
