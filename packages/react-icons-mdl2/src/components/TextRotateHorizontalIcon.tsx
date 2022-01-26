import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextRotateHorizontalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1664H0V128zm1920 1536V256H128v1408h1792zM436 896l-48 128H285l240-640h102l240 640H764l-48-128H436zm140-375l-92 247h184l-92-247zm803 922l163-163H256v-128h1286l-163-163 90-90 317 317-317 317-90-90z" />
    </svg>
  ),
  displayName: 'TextRotateHorizontalIcon',
});

export default TextRotateHorizontalIcon;
