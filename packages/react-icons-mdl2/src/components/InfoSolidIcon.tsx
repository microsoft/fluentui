import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InfoSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 0q132 0 255 34t229 97 194 150 150 194 97 230 35 255q0 132-34 255t-97 229-150 194-194 150-230 97-255 35q-132 0-255-34t-229-97-194-150-150-194-97-229T0 960q0-132 34-255t97-229 150-194 194-150 229-97T960 0zm64 768H896v640h128V768zm0-256H896v128h128V512z" />
    </svg>
  ),
  displayName: 'InfoSolidIcon',
});

export default InfoSolidIcon;
