import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FiltersSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 1024h1280v128q0 27-10 50t-27 40-41 28-50 10h-256v512q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100v-512H512q-27 0-50-10t-40-27-28-41-10-50v-128zM1600 0q40 0 75 15t61 41 41 61 15 75v64h-34q-17 0-33 2t-30 8-22 19-9 35v576H384V256q0-53 20-99t55-82 81-55T640 0h960z" />
    </svg>
  ),
  displayName: 'FiltersSolidIcon',
});

export default FiltersSolidIcon;
