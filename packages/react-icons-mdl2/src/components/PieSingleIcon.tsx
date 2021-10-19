import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PieSingleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 0q124 0 238 32t214 90 181 140 140 181 91 214 32 239h-896V0zm128 768h630q-21-121-76-226t-139-189-188-138-227-77v630zm-256 256h896q0 59-3 114t-11 109-23 107-38 108q-57 134-148 242t-206 184-251 118-280 42q-133 0-255-34t-230-96-194-150-150-195-97-229-34-256q0-133 34-255t96-230 150-194 195-150 229-97 256-34h64v896zm-128 128V258q-108 8-207 42t-184 91-155 131-119 165-76 191-27 210q0 115 30 221t84 198 130 169 168 130 199 84 221 30q108 0 209-27t191-76 165-119 132-155 90-184 43-207H896z" />
    </svg>
  ),
  displayName: 'PieSingleIcon',
});

export default PieSingleIcon;
