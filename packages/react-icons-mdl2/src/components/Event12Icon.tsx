import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Event12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 171h341v1877H0V171h341V0h171v171h853V0h171v171zm171 1706V683H171v1194h1536zm0-1365V341H171v171h1536z" />
    </svg>
  ),
  displayName: 'Event12Icon',
});

export default Event12Icon;
