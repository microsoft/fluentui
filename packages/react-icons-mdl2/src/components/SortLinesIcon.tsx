import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SortLinesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 1638l163-163 90 90-317 318L3 1565l90-90 163 163V128h128v1510zm384-358v-128h512v128H768zm0-384V768h896v128H768zm0-512h1280v128H768V384z" />
    </svg>
  ),
  displayName: 'SortLinesIcon',
});

export default SortLinesIcon;
