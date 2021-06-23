import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlignHorizontalLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0h128v2048H0V0zm1408 896H256V384h1152v512zm-128-384H384v256h896V512zm640 640v512H256v-512h1664zm-128 128H384v256h1408v-256z" />
    </svg>
  ),
  displayName: 'AlignHorizontalLeftIcon',
});

export default AlignHorizontalLeftIcon;
