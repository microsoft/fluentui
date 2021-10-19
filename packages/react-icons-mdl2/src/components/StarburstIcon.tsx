import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StarburstIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1280l96 480-480-96-256 384-256-384-480 96 96-480L0 1024l384-256-96-480 480 96L1024 0l256 384 480-96-96 480 384 256-384 256zm-443 242q95 17 188 36t188 39q-20-94-39-187t-36-189q75-49 148-98t147-99q-74-50-147-99t-148-98q18-95 37-188t38-188q-94 20-187 39t-189 36q-49-75-98-148t-99-147q-50 74-99 147t-98 148q-95-17-188-36t-188-39q20 94 39 187t36 189q-75 49-148 98t-147 99q74 50 147 99t148 98q-18 95-37 188t-38 188q94-20 187-39t189-36q49 75 98 148t99 147q50-74 99-147t98-148z" />
    </svg>
  ),
  displayName: 'StarburstIcon',
});

export default StarburstIcon;
