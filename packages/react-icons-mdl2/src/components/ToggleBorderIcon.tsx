import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ToggleBorderIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1582 558q96 0 181 37t148 100 100 148 37 181q0 96-37 181t-100 148-148 100-181 37H466q-96 0-181-37t-148-100-100-148-37-181q0-96 37-181t100-148 148-100 181-37h1116zm0 838q77 0 145-29t118-80 80-118 30-145q0-77-29-144t-80-118-119-80-145-30H466q-77 0-145 29t-118 80-80 118-30 145q0 77 29 144t80 118 119 80 145 30h1116z" />
    </svg>
  ),
  displayName: 'ToggleBorderIcon',
});

export default ToggleBorderIcon;
