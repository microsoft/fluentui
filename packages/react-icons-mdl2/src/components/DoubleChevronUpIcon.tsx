import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronUpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1957L1024 933l1024 1024-91 91-933-933-933 933-91-91zM1024 219L91 1152l-91-91L1024 37l1024 1024-91 91-933-933z" />
    </svg>
  ),
  displayName: 'DoubleChevronUpIcon',
});

export default DoubleChevronUpIcon;
