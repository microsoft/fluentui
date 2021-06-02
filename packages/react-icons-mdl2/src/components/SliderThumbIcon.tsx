import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SliderThumbIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1365 341v1366q0 70-27 132t-73 108-109 74-132 27q-70 0-132-27t-108-73-74-109-27-132V341q0-70 27-132t73-108 109-74 132-27q70 0 132 27t108 73 74 109 27 132z" />
    </svg>
  ),
  displayName: 'SliderThumbIcon',
});

export default SliderThumbIcon;
