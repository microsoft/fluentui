import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CompassNWIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 0q133 0 255 34t230 96 194 150 150 195 97 229 34 256q0 133-34 255t-96 230-150 194-195 150-229 97-256 34q-133 0-255-34t-230-96-194-150-150-195-97-229T0 960q0-133 34-255t96-230 150-194 195-150 229-97T960 0zm64 1790q102-8 196-39t176-83 152-120 120-151 82-177 40-196h-126V896h126q-8-102-39-196t-83-176-120-152-151-120-177-82-196-40v126H896V130q-102 8-196 39t-176 83-152 120-120 151-82 177-40 196h126v128H130q8 102 39 196t83 176 120 152 151 120 177 82 196 40v-126h128v126zm85-979l299 597-597-299-299-597 597 299zm63 361l-141-283-283-141 141 283 283 141z" />
    </svg>
  ),
  displayName: 'CompassNWIcon',
});

export default CompassNWIcon;
