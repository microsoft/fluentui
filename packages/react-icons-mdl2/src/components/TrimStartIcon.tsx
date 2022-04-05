import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TrimStartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 128H896v1792h768v128H256V0h1408v128zM768 1920V128H384v1792h384z" />
    </svg>
  ),
  displayName: 'TrimStartIcon',
});

export default TrimStartIcon;
