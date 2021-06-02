import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TabletSelectedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1408h256v128H896v-128zm992-1152q33 0 62 12t51 35 34 51 13 62v843l-128-123V416q0-14-9-23t-23-9H160q-14 0-23 9t-9 23v1216q0 14 9 23t23 9h800l128 128H160q-33 0-62-12t-51-35-34-51-13-62V416q0-33 12-62t35-51 51-34 62-13h1728zm51 1091l90 91-557 557-269-269 90-91 179 179 467-467z" />
    </svg>
  ),
  displayName: 'TabletSelectedIcon',
});

export default TabletSelectedIcon;
