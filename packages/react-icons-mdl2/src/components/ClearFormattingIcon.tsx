import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ClearFormattingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1243 1920h421v128H677l-248-248q-27-27-41-62t-15-74q0-38 14-73t42-63l435-435-65-197H353l-85 256H128L512 0h128l329 988 375-374 602 602-703 704zM756 768L576 228 396 768h360zm588 26l-550 550 422 422 550-550-422-422zm-283 1126l65-64-422-422-184 185q-19 19-19 45t19 45l211 211h330z" />
    </svg>
  ),
  displayName: 'ClearFormattingIcon',
});

export default ClearFormattingIcon;
