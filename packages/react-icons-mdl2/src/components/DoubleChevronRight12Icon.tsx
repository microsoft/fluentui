import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronRight12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M999 25l999 999-999 999-121-121 879-878-879-878L999 25zm-853 0l999 999-999 999-121-121 878-878L25 146 146 25z" />
    </svg>
  ),
  displayName: 'DoubleChevronRight12Icon',
});

export default DoubleChevronRight12Icon;
