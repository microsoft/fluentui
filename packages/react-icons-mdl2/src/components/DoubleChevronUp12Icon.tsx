import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronUp12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 291l-878 879-121-121 999-999 999 999-121 121-878-879zM25 1902l999-999 999 999-121 121-878-878-878 878-121-121z" />
    </svg>
  ),
  displayName: 'DoubleChevronUp12Icon',
});

export default DoubleChevronUp12Icon;
