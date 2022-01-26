import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronUp8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1099l762 762-181 181-581-581-581 581-181-181 762-762zm-581-81L262 837l762-762 762 762-181 181-581-581-581 581z" />
    </svg>
  ),
  displayName: 'DoubleChevronUp8Icon',
});

export default DoubleChevronUp8Icon;
