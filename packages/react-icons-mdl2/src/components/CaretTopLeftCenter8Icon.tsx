import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretTopLeftCenter8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1717 256L256 1717V256h1461zM512 1099l587-587H512v587z" />
    </svg>
  ),
  displayName: 'CaretTopLeftCenter8Icon',
});

export default CaretTopLeftCenter8Icon;
