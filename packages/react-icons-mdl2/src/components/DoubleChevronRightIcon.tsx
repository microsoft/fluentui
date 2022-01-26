import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M91 0l1024 1024L91 2048l-91-91 933-933L0 91 91 0zm896 0l1024 1024L987 2048l-91-91 933-933L896 91l91-91z" />
    </svg>
  ),
  displayName: 'DoubleChevronRightIcon',
});

export default DoubleChevronRightIcon;
