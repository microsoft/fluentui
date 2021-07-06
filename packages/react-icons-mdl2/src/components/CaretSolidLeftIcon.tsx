import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretSolidLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 1024L1408 0v2048L384 1024z" />
    </svg>
  ),
  displayName: 'CaretSolidLeftIcon',
});

export default CaretSolidLeftIcon;
