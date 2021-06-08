import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const QandAIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 384h128v1280h-256v384l-384-384H768l128-128h437l203 203v-203h256V384zM768 1408l-384 384v-384H0V0h1664v1408H768zm-640-128h384v203l203-203h821V128H128v1152zm640-128v-128h128v128H768zm64-768q-27 0-50 10t-40 27-28 41-10 50H576q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 46-14 81t-37 65-52 57-59 58q-20 20-25 42t-6 47v16q0 8 1 18H768v-48q0-46 14-81t35-63 47-50 46-45 36-45 14-52q0-27-10-50t-27-40-41-28-50-10z" />
    </svg>
  ),
  displayName: 'QandAIcon',
});

export default QandAIcon;
