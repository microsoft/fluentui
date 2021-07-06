import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronDown8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 949L262 187 443 6l581 581L1605 6l181 181-762 762zm581 81l181 181-762 762-762-762 181-181 581 581 581-581z" />
    </svg>
  ),
  displayName: 'DoubleChevronDown8Icon',
});

export default DoubleChevronDown8Icon;
