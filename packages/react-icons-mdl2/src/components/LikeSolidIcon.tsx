import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LikeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1856 640q39 0 74 15t61 41 42 61 15 75q0 32-10 61l-256 768q-10 29-28 53t-42 42-52 26-60 10h-512q-179 0-345-69-72-29-144-44t-151-15H0V768h417q65 0 122-24t104-70l622-621q25-25 50-39t61-14q33 0 62 12t51 35 34 51 13 62q0 81-18 154t-53 146q-20 43-34 87t-19 93h444z" />
    </svg>
  ),
  displayName: 'LikeSolidIcon',
});

export default LikeSolidIcon;
