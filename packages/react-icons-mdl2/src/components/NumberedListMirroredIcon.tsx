import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NumberedListMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 512V384h1536v128H0zm0 512V896h1536v128H0zm0 512v-128h1536v128H0zM1847 381v-69q31-11 59-24t54-33h49v385h-82V349q-14 11-37 21t-43 11zm201 702v69h-251v-28q0-34 12-59t31-44 40-35 40-31 30-32 13-39q0-27-15-38t-40-11q-26 0-49 11t-44 28v-73q50-32 111-32 25 0 47 6t39 20 26 34 10 47q0 31-12 54t-29 42-39 33-38 27-30 25-12 26h160zm-86 385q36 5 61 27t25 61q0 31-12 53t-33 35-46 20-54 7q-24 0-48-4t-47-15v-73q19 14 41 21t47 7q26 0 46-11t21-41q0-18-9-28t-23-16-31-6-32-2h-22v-64h26q13 0 27-1t26-6 19-14 8-27q0-26-16-36t-40-10q-39 0-74 24v-68q22-11 45-15t48-5q22 0 44 5t39 16 28 30 11 43q0 38-19 60t-56 32v1z" />
    </svg>
  ),
  displayName: 'NumberedListMirroredIcon',
});

export default NumberedListMirroredIcon;
