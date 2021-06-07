import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HexagonIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2024 960l-497 960H521L24 960 521 0h1006l497 960zm-144 0l-431-832H599L168 960l431 832h850l431-832z" />
    </svg>
  ),
  displayName: 'HexagonIcon',
});

export default HexagonIcon;
