import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GlimmerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 0h256v1280h-256V0zM0 2048v-256h1280v256H0zM486 666l180-180 896 896-180 180-896-896z" />
    </svg>
  ),
  displayName: 'GlimmerIcon',
});

export default GlimmerIcon;
