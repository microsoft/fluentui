import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnlockIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 896v1152H256V896h1152V512q0-82-29-152t-81-121-122-81-152-30q-82 0-152 29t-121 81-81 122-30 152H512q0-109 39-202t108-163T821 39t203-39q109 0 202 39t163 108 108 162 39 203v384h256zm-128 128H384v896h1280v-896z" />
    </svg>
  ),
  displayName: 'UnlockIcon',
});

export default UnlockIcon;
