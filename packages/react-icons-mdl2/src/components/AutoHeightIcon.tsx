import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AutoHeightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M448 102l365 365-90 90-211-210v549H384V347L173 557l-90-90 365-365zm275 1389l90 90-365 365-365-365 90-90 211 210v-549h128v549l211-210zM2048 256v1536H896v-128h1024V384H896V256h1152zm-384 256l-197 320h340l-626 704H927l165-384H856l320-640h488zm-425 448l196-320h-179l-192 384h222l-163 384 398-448h-282z" />
    </svg>
  ),
  displayName: 'AutoHeightIcon',
});

export default AutoHeightIcon;
