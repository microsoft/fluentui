import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FavoriteStarFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1416 1254l248 794-640-492-640 492 248-794L0 768h784L1024 0l240 768h784l-632 486z" />
    </svg>
  ),
  displayName: 'FavoriteStarFillIcon',
});

export default FavoriteStarFillIcon;
