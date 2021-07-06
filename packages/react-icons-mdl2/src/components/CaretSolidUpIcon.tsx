import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretSolidUpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 384l1024 1024H0L1024 384z" />
    </svg>
  ),
  displayName: 'CaretSolidUpIcon',
});

export default CaretSolidUpIcon;
