import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CricketIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 1408q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20zm0 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10zM1984 0q26 0 45 19t19 45q0 26-19 45l-546 547q26 39 39 84t14 92v27L347 2048 0 1701 1189 512q58 0 105 10t98 43l547-546q19-19 45-19zm-578 807q-4-32-18-60t-36-50-50-36-61-19L181 1701l166 166L1406 807z" />
    </svg>
  ),
  displayName: 'CricketIcon',
});

export default CricketIcon;
