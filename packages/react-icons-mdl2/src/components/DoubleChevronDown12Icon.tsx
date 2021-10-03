import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronDown12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1757l878-879 121 121-999 999L25 999l121-121 878 879zm999-1611l-999 999L25 146 146 25l878 878 878-878 121 121z" />
    </svg>
  ),
  displayName: 'DoubleChevronDown12Icon',
});

export default DoubleChevronDown12Icon;
