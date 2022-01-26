import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriangleSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 146l1024 1774H0L1024 146z" />
    </svg>
  ),
  displayName: 'TriangleSolidIcon',
});

export default TriangleSolidIcon;
