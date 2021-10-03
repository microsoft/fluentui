import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronLeft8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1461 1024l581 581-181 181-762-762 762-762 181 181-581 581zm-443-581l-581 581 581 581-181 181-762-762 762-762 181 181z" />
    </svg>
  ),
  displayName: 'DoubleChevronLeft8Icon',
});

export default DoubleChevronLeft8Icon;
