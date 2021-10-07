import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 91l-933 933 933 933-91 91L933 1024 1957 0l91 91zm-896 0l-933 933 933 933-91 91L37 1024 1061 0l91 91z" />
    </svg>
  ),
  displayName: 'DoubleChevronLeftIcon',
});

export default DoubleChevronLeftIcon;
