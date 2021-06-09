import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BusSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 640v256h-128v1024q0 27-10 50t-27 40-41 28-50 10h-128q-27 0-50-10t-40-27-28-41-10-50H512q0 27-10 50t-27 40-41 28-50 10H256q-27 0-50-10t-40-27-28-41-10-50V896H0V640h128V320q0-40 15-75t41-61 61-41 75-15h1280q40 0 75 15t61 41 41 61 15 75v320h128zM256 1152h640V640H256v512zm256 320q0-26-19-45t-45-19q-26 0-45 19t-19 45v64h128v-64zm1152 192H256v128h1408v-128zm-128-128v-64q0-26-19-45t-45-19q-26 0-45 19t-19 45v64h128zm128-896h-640v512h640V640z" />
    </svg>
  ),
  displayName: 'BusSolidIcon',
});

export default BusSolidIcon;
