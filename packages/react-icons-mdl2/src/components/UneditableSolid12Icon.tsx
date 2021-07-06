import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UneditableSolid12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1908 562l-424-423q31-31 59-57t60-44 67-28 84-10q61 0 114 21t94 60 63 91 23 114q0 47-10 84t-28 70-44 61-58 61zm-152 150l-282 282-420-420 280-284 422 422zM25 146L146 25l1877 1877-121 121-729-729-420 419L0 2046l348-759 407-411L25 146z" />
    </svg>
  ),
  displayName: 'UneditableSolid12Icon',
});

export default UneditableSolid12Icon;
