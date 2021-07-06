import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReviewSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M448 768l-320 320V768H0V128h1664v640H448zm-64 256h1664v640h-128v320l-320-320H384v-640z" />
    </svg>
  ),
  displayName: 'ReviewSolidIcon',
});

export default ReviewSolidIcon;
