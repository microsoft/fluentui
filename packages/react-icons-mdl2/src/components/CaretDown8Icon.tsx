import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretDown8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 512h2048L1024 1536 0 512zm618 256l406 406 406-406H618z" />
    </svg>
  ),
  displayName: 'CaretDown8Icon',
});

export default CaretDown8Icon;
