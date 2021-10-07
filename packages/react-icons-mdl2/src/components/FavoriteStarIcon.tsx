import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FavoriteStarIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1416 1254l248 794-640-492-640 492 248-794L0 768h784L1024 0l240 768h784l-632 486zm5 446q-38-124-76-246t-78-247q103-77 203-155t202-156h-502l-146-467-146 467H376q102 78 202 156t203 155q-40 124-78 246t-76 247l397-306 397 306z" />
    </svg>
  ),
  displayName: 'FavoriteStarIcon',
});

export default FavoriteStarIcon;
