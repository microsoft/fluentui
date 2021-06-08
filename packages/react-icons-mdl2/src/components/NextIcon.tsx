import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NextIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 256h128v1536h-128V256zM256 1792V256l1088 768-1088 768zM384 503v1042l738-521-738-521z" />
    </svg>
  ),
  displayName: 'NextIcon',
});

export default NextIcon;
