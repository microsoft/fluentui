import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CircleFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M32 1024q0-137 35-264t100-237 155-200 201-155T760 68t264-36q137 0 264 35t237 100 200 155 155 201 100 237 36 264q0 137-35 264t-100 237-155 200-201 155-237 100-264 36q-137 0-264-35t-237-100-200-155-155-201-100-237-36-264z" />
    </svg>
  ),
  displayName: 'CircleFillIcon',
});

export default CircleFillIcon;
