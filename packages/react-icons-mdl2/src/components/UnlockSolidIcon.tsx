import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnlockSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 896v1152H256V896h1152V512q0-82-29-152t-80-122-122-81-153-29q-82 0-152 29t-122 80-81 122-29 153H512q0-109 39-202t108-163T821 39t203-39q109 0 202 39t163 108 108 162 39 203v384h256z" />
    </svg>
  ),
  displayName: 'UnlockSolidIcon',
});

export default UnlockSolidIcon;
