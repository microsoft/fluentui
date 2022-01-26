import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CommentSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1408H731l-475 475v-475H0V128zm896 512H640v256h128v128q27 0 50-10t40-27 28-41 10-50V640zm512 0h-256v256h128v128q27 0 50-10t40-27 28-41 10-50V640z" />
    </svg>
  ),
  displayName: 'CommentSolidIcon',
});

export default CommentSolidIcon;
