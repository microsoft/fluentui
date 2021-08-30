import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SkypeMinusIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1591 823q42 0 78 16t64 43 43 63 16 79q0 42-16 78t-43 64-63 43-79 16H395q-42 0-78-16t-64-43-42-63-16-79q0-42 15-78t43-64 63-43 79-16h1196z" />
    </svg>
  ),
  displayName: 'SkypeMinusIcon',
});

export default SkypeMinusIcon;
