import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DropShapeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1607 1166q28 57 42 118t15 124q0 88-23 170t-64 153-100 129-130 100-153 65-170 23q-88 0-170-23t-153-64-129-100-100-130-65-153-23-170q0-63 14-124t43-118L1024 0l583 1166z" />
    </svg>
  ),
  displayName: 'DropShapeSolidIcon',
});

export default DropShapeSolidIcon;
