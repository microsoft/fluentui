import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronRight8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M187 262l762 762-762 762L6 1605l581-581L6 443l181-181zm1786 762l-762 762-181-181 581-581-581-581 181-181 762 762z" />
    </svg>
  ),
  displayName: 'DoubleChevronRight8Icon',
});

export default DoubleChevronRight8Icon;
