import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InsertRowsBelowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1664h-640l128-128h384v-384h-768V768H768v512H128v384h256l128 128H0V128h2048zM640 256H128v384h512V256zm640 0H768v384h512V256zm640 0h-512v384h512V256zm-621 1139l90 90-429 429-429-429 90-90 275 275V896h128v774l275-275z" />
    </svg>
  ),
  displayName: 'InsertRowsBelowIcon',
});

export default InsertRowsBelowIcon;
