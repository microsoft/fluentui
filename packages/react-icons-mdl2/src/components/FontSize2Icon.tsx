import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FontSize2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M585 512h143l582 1536h-158l-188-512H343l-184 512H0L585 512zm-198 897h529L683 781q-20-53-28-108h-5q-11 56-30 108l-233 628zM1604 283l-230 230-90-91 320-320 320 320-91 91-229-230zm-4 587l230-230 90 90-320 320-320-320 90-90 230 230z" />
    </svg>
  ),
  displayName: 'FontSize2Icon',
});

export default FontSize2Icon;
