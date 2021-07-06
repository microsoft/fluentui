import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InfoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 1920q-133 0-255-34t-230-96-194-150-150-195-97-229T0 960q0-133 34-255t96-230 150-194 195-150 229-97T960 0q133 0 255 34t230 96 194 150 150 195 97 229 34 256q0 133-34 255t-96 230-150 194-195 150-229 97-256 34zm0-1792q-115 0-221 30t-198 84-169 130-130 168-84 199-30 221q0 114 30 220t84 199 130 169 168 130 199 84 221 30q114 0 220-30t199-84 169-130 130-168 84-199 30-221q0-114-30-220t-84-199-130-169-168-130-199-84-221-30zm-64 640h128v640H896V768zm0-256h128v128H896V512z" />
    </svg>
  ),
  displayName: 'InfoIcon',
});

export default InfoIcon;
