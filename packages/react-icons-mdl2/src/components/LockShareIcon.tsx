import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LockShareIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1629 1789l-90-90 162-163h-293q-27 0-50 10t-40 27-28 41-10 50v128h-128v-128q0-53 20-99t55-82 81-55 100-20h293l-162-163 90-90 317 317-317 317zm-477 259v-128h640v128h-640zM384 1024v896h640v128H256V896h256V522q0-108 39-203t108-166T821 41t203-41q109 0 202 41t163 112 108 166 39 203v374h256v128H384zm256-502v374h768V522q0-81-29-152t-80-126-122-85-153-31q-82 0-152 31t-122 85-81 125-29 153z" />
    </svg>
  ),
  displayName: 'LockShareIcon',
});

export default LockShareIcon;
