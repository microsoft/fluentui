import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ZoomIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1978q0 28-17 49t-47 21q-26 0-45-19l-785-784q-96 79-210 121t-240 42q-97 0-187-25t-168-71-142-110-111-143-71-168T0 704q0-97 25-187t71-168 110-142T349 96t168-71T704 0q97 0 187 25t168 71 142 110 111 143 71 168 25 187q0 125-42 239t-121 211l57 57q42 42 102 100t130 127 142 141 139 140 119 123 83 91 31 45zM704 1280q119 0 224-45t183-124 123-183 46-224q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45T297 297 174 480t-46 224q0 119 45 224t124 183 183 123 224 46z" />
    </svg>
  ),
  displayName: 'ZoomIcon',
});

export default ZoomIcon;
