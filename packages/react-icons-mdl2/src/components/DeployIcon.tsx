import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DeployIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 870l301 301-90 90-147-146v677H896v-677l-147 146-90-90 301-301zM768 128h512v512H768V128zm128 384h256V256H896v256zM128 128h512v512H128V128zm1792 0v512h-512V128h512z" />
    </svg>
  ),
  displayName: 'DeployIcon',
});

export default DeployIcon;
