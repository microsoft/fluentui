import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Devices3Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 384h1664v1024h-768v128h256v128H768v-128h256v-128H640v256H128V896h128V384zm256 1152v-512H256v512h256zm128-256h1152V512H384v384h256v384z" />
    </svg>
  ),
  displayName: 'Devices3Icon',
});

export default Devices3Icon;
