import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ToggleFilledIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1582 1490H466q-96 0-181-37t-148-100-100-148-37-181q0-96 37-181t100-148 148-100 181-37h1116q96 0 181 37t148 100 100 148 37 181q0 96-37 181t-100 148-148 100-181 37z" />
    </svg>
  ),
  displayName: 'ToggleFilledIcon',
});

export default ToggleFilledIcon;
