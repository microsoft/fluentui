import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BufferTimeBeforeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 320q97 0 187 25t168 71 143 110 110 142 71 169 25 187q0 97-25 187t-71 168-110 143-142 110-169 71-187 25q-97 0-187-25t-168-71-143-110-110-142-71-169-25-187q0-97 25-187t71-168 110-143 142-110 169-71 187-25zm0 1280q119 0 224-45t183-124 123-183 46-224q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45T617 617 494 800t-46 224q0 119 45 224t124 183 183 123 224 46zm0-576h256v128H896V640h128v384zm634-634q-128-127-291-194t-343-68q-180 0-343 67T390 390l-90-90q72-72 156-128t176-94 191-58 201-20q102 0 200 19t191 58 177 95 156 128l-90 90z" />
    </svg>
  ),
  displayName: 'BufferTimeBeforeIcon',
});

export default BufferTimeBeforeIcon;
