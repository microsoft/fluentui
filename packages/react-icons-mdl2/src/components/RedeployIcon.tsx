import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RedeployIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 870l301 301-90 90-147-146v677H896v-677l-147 146-90-90 301-301zM128 128h512v512H128V128zm640 0h512v512H768V128zm1152 0v512h-512V128h512z" />
    </svg>
  ),
  displayName: 'RedeployIcon',
});

export default RedeployIcon;
