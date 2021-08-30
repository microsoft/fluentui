import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const QuarterCircleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v1792H128q0-99 6-192t23-183 42-180 65-182q68-160 164-300t215-258 258-209 294-157 320-97 341-34h64zm-128 129q-208 8-400 67t-360 161-307 240-240 307-160 360-68 400h1535V257z" />
    </svg>
  ),
  displayName: 'QuarterCircleIcon',
});

export default QuarterCircleIcon;
