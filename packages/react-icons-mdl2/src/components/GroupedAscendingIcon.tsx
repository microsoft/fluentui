import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GroupedAscendingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 128h1536v128H384V128zm128 603v1061h1408v128H384V731L91 1024 0 933l448-447 448 447-91 91-293-293zm512 677v-128h896v128h-896zm0-384V896h896v128h-896zm0-384V512h896v128h-896z" />
    </svg>
  ),
  displayName: 'GroupedAscendingIcon',
});

export default GroupedAscendingIcon;
