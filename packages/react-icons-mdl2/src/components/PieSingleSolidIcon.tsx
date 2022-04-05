import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PieSingleSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 0q124 0 238 32t214 90 181 140 140 181 91 214 32 239h-896V0zm-128 1024h896q0 59-3 114t-11 109-23 107-38 108q-57 134-148 242t-206 184-251 118-280 42q-133 0-255-34t-230-96-194-150-150-195-97-229-34-256q0-133 34-255t96-230 150-194 195-150 229-97 256-34h64v896z" />
    </svg>
  ),
  displayName: 'PieSingleSolidIcon',
});

export default PieSingleSolidIcon;
