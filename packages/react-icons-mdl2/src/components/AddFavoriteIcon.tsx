import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AddFavoriteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1370 1536l-103-329 405-311h-502l-146-467-138 467H384l397 311-154 493 397-306 256 197v162l-256-197-640 492 248-794L0 768h784L1024 0l240 768h784l-632 486 88 282h-134zm422-128v256h256v128h-256v256h-128v-256h-256v-128h256v-256h128z" />
    </svg>
  ),
  displayName: 'AddFavoriteIcon',
});

export default AddFavoriteIcon;
