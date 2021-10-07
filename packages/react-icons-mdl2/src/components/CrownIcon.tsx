import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CrownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1793 321q40 0 75 15t61 41 41 61 15 75q0 40-15 75t-42 61-61 41-75 15v1216H256V705q-40 0-74-15t-61-41-41-62-15-74q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75q0 55-29 102t-80 71l361 479 260-471q-29-10-52-28t-41-42-26-52-9-59q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75q0 61-34 110t-92 70l263 473 354-481q-49-24-78-70t-29-102q0-40 15-75t41-61 61-41 75-15zM961 513q0 27 19 45t46 19v-1l1 1q26-1 44-19t18-45q0-26-19-45t-45-19q-26 0-45 19t-19 45zm-768 0q0 26 18 45t45 19v-1l1 1q26 0 45-19t19-45q0-26-19-45t-45-19q-26 0-45 19t-19 45zm1470 451l-324 441-312-563-309 559-333-441v832h1278V964zm129-387q26 0 45-18t20-46q0-26-19-45t-45-19q-26 0-45 19t-19 45q0 25 17 43t42 21l4-5v5z" />
    </svg>
  ),
  displayName: 'CrownIcon',
});

export default CrownIcon;
