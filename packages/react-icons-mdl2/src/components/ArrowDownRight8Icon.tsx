import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrowDownRight8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 256h256v1792H256v-256h1355L37 219 219 37l1573 1574V256z" />
    </svg>
  ),
  displayName: 'ArrowDownRight8Icon',
});

export default ArrowDownRight8Icon;
