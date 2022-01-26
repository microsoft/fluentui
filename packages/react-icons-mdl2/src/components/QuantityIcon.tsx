import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const QuantityIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1472 600l575 288v782l-575 288-576-286v-321l-320 159L0 1224l1-784 575-288 575 288 1 321 320-161zm368 327l-368-183-368 183 368 184 368-184zM944 479L576 296 208 479l368 184 368-184zM129 583l-1 561 384 191V774L129 583zm511 752l257-127V888l127-63-1-242-383 191v561zm385-304l-1 561 384 191v-561l-383-191zm511 752l383-192v-560l-383 191v561z" />
    </svg>
  ),
  displayName: 'QuantityIcon',
});

export default QuantityIcon;
