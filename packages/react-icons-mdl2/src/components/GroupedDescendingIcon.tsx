import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GroupedDescendingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 1920v-128h1536v128H384zm0-1792h1536v128H512v1061l293-293 91 91-448 447L0 1115l91-91 293 293V128zm640 640V640h896v128h-896zm0 384v-128h896v128h-896zm0 384v-128h896v128h-896z" />
    </svg>
  ),
  displayName: 'GroupedDescendingIcon',
});

export default GroupedDescendingIcon;
