import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretRight8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M512 0l1024 1024L512 2048V0zm256 618v812l406-406-406-406z" />
    </svg>
  ),
  displayName: 'CaretRight8Icon',
});

export default CaretRight8Icon;
