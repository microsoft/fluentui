import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretSolidRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 0l1024 1024L640 2048V0z" />
    </svg>
  ),
  displayName: 'CaretSolidRightIcon',
});

export default CaretSolidRightIcon;
