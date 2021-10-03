import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SortLinesAscendingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M3 483l317-318 317 318-90 90-163-163v1510H256V410L93 573 3 483zm1277-99v128H768V384h512zm384 384v128H768V768h896zm-896 384h1280v128H768v-128z" />
    </svg>
  ),
  displayName: 'SortLinesAscendingIcon',
});

export default SortLinesAscendingIcon;
