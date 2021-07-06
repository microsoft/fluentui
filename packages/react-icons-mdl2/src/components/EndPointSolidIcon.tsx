import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EndPointSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 2048V0h768v1024H384v1024H256zm896-1792h768v1024h-768V256z" />
    </svg>
  ),
  displayName: 'EndPointSolidIcon',
});

export default EndPointSolidIcon;
