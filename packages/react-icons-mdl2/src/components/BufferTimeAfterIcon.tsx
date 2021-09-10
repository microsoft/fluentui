import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BufferTimeAfterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1728q-97 0-187-25t-168-71-143-110-110-142-71-169-25-187q0-97 25-187t71-168 110-143 142-110 169-71 187-25q97 0 187 25t168 71 143 110 110 142 71 169 25 187q0 97-25 187t-71 168-110 143-142 110-169 71-187 25zm0-1280q-119 0-224 45T617 617 494 800t-46 224q0 119 45 224t124 183 183 123 224 46q119 0 224-45t183-124 123-183 46-224q0-119-45-224t-124-183-183-123-224-46zm256 704H896V640h128v384h256v128zm468 596q-72 72-156 128t-176 94-191 58-201 20q-102 0-200-19t-191-58-177-95-156-128l90-90q128 127 291 194t343 68q180 0 343-67t291-195l90 90z" />
    </svg>
  ),
  displayName: 'BufferTimeAfterIcon',
});

export default BufferTimeAfterIcon;
