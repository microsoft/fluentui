import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FrigidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1419q29 10 52 28t41 42 26 52 9 59q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75q0-30 9-58t26-53 40-42 53-28v-395h128v395zm256-100q57 63 88 141t32 163q0 90-35 167t-96 135-141 90-168 33q-88 0-168-33t-140-90-96-134-36-168q0-85 31-163t89-141V320q0-66 25-124t68-101 102-69T960 0q66 0 124 25t101 69 69 102 26 124v999zm-320 601q62 0 118-23t100-63 68-95 26-118q0-75-33-137t-87-113V320q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75v1051q-54 50-87 112t-33 138q0 63 25 118t69 95 99 63 119 23v64-64z" />
    </svg>
  ),
  displayName: 'FrigidIcon',
});

export default FrigidIcon;
