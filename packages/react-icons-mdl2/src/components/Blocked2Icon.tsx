import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Blocked2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 0q132 0 255 34t229 97 194 150 150 194 97 230 35 255q0 132-34 255t-97 229-150 194-194 150-230 97-255 35q-132 0-255-34t-229-97-194-150-150-194-97-229T0 960q0-132 34-255t97-229 150-194 194-150 229-97T960 0zm0 1792q115 0 221-29t199-84 168-130 130-168 84-199 30-222q0-115-29-221t-84-199-130-168-168-130-199-84-222-30q-115 0-221 29t-199 84-168 130-130 168-84 199-30 222q0 115 29 221t84 199 130 168 168 130 199 84 222 30zM384 896h1152v128H384V896z" />
    </svg>
  ),
  displayName: 'Blocked2Icon',
});

export default Blocked2Icon;
