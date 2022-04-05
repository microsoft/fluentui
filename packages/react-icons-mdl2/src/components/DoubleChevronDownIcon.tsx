import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 91L1024 1115 0 91 91 0l933 933L1957 0l91 91zM1024 1829l933-933 91 91-1024 1024L0 987l91-91 933 933z" />
    </svg>
  ),
  displayName: 'DoubleChevronDownIcon',
});

export default DoubleChevronDownIcon;
