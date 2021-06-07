import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NumberSymbolIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1685 768h-326l-80 384h351l-32 128h-333l-113 512H989l111-512H778l-109 512H508l108-512H298l24-128h330l79-384H384l25-128h340l107-512h161L910 640h320l110-512h157l-107 512h323l-28 128zm-559 384l82-384H886l-85 384h325z" />
    </svg>
  ),
  displayName: 'NumberSymbolIcon',
});

export default NumberSymbolIcon;
