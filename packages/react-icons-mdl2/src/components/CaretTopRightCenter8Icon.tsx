import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretTopRightCenter8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 256v1461L331 256h1461zm-256 256H949l587 587V512z" />
    </svg>
  ),
  displayName: 'CaretTopRightCenter8Icon',
});

export default CaretTopRightCenter8Icon;
