import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1023 1664H896V896h253q49 0 94 12t80 37 55 64 21 94q0 83-46 136t-124 76q39 22 70 58t54 75l136 216h-148l-123-206q-13-22-27-41t-30-33-38-23-49-9h-51v312zm0-415h106q60 0 98-35t38-97q0-62-39-90t-96-28h-107v250zm897-1121v1792H128V128h1792zm-128 128H256v1536h1536V256z" />
    </svg>
  ),
  displayName: 'RIcon',
});

export default RIcon;
