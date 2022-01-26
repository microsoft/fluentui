import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M549 1536l987-987v987H549z" />
    </svg>
  ),
  displayName: 'CaretSolidIcon',
});

export default CaretSolidIcon;
