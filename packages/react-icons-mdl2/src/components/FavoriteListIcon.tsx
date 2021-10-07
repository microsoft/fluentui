import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FavoriteListIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 768v128h-878q-36-118-72-233t-74-234q-37 118-73 233t-73 234H376q102 78 202 156t203 155q-40 124-78 246t-76 247l397-306v162l-640 492 248-794L0 768h784L1024 0l240 768h784zm-896 384h896v128h-896v-128zm0 384h896v128h-896v-128z" />
    </svg>
  ),
  displayName: 'FavoriteListIcon',
});

export default FavoriteListIcon;
