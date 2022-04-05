import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GiftBoxSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 768v1280h-768V768h256q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-53 0-99 20t-82 55-55 81-20 100H896q0-53-20-99t-55-82-81-55-100-20q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10h256v1280H128V768h292q-35-59-35-128 0-53 20-99t54-82 81-55 100-20q97 0 181 45t139 127q54-81 138-126t182-46q53 0 99 20t82 55 55 81 20 100q0 34-9 66t-27 62h292z" />
    </svg>
  ),
  displayName: 'GiftBoxSolidIcon',
});

export default GiftBoxSolidIcon;
