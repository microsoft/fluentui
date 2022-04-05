import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FullScreenIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v640h-128V347L347 1792h421v128H128v-640h128v421L1701 256h-421V128h640z" />
    </svg>
  ),
  displayName: 'FullScreenIcon',
});

export default FullScreenIcon;
