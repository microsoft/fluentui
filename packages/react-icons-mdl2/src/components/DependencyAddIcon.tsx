import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DependencyAddIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 512v640h512v128H0V384h1280v512h-128V512H128zm640 1408v-896h1280v896H768zm128-768v640h1024v-640H896zm384-1023V0h257q51 0 98 19t84 56q36 36 55 83t20 99v294l164-162 90 90-318 318-319-318 91-90 164 162V257q0-27-10-50t-27-41-41-27-51-10h-257z" />
    </svg>
  ),
  displayName: 'DependencyAddIcon',
});

export default DependencyAddIcon;
