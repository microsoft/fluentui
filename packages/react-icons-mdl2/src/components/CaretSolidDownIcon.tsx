import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretSolidDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 640h2048L1024 1664 0 640z" />
    </svg>
  ),
  displayName: 'CaretSolidDownIcon',
});

export default CaretSolidDownIcon;
