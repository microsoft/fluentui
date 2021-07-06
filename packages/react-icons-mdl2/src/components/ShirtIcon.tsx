import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShirtIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384l-128 512h-256v1024H384V896H128L0 384l768-256q0 53 20 99t55 82 81 55 100 20q53 0 99-20t82-55 55-81 20-100l768 256zm-153 84l-524-175q-24 50-60 90t-82 69-97 44-108 16q-56 0-108-15t-97-44-81-69-61-91L153 468l75 300h284v1024h1024V768h284l75-300z" />
    </svg>
  ),
  displayName: 'ShirtIcon',
});

export default ShirtIcon;
