import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BoldIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1255 901q92 0 173 35t142 95 96 142 35 173q0 92-35 173t-95 142-142 96-174 35H512V128h743q80 0 150 30t122 83 83 123 31 150q0 80-30 150t-82 123-123 83-151 31zm-208-535H896v475h151q49 0 92-19t76-51 51-75 19-93q0-49-19-92t-51-75-75-51-93-19zm59 1188q49 0 92-18t76-51 51-76 19-92q0-49-18-92t-51-76-76-51-93-19H896v475h210z" />
    </svg>
  ),
  displayName: 'BoldIcon',
});

export default BoldIcon;
