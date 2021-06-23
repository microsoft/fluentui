import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AirplaneIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 768q52 0 99 20t81 55 55 82 21 99q0 53-20 99t-55 81-82 55-99 21h-448l-384 768H512l256-768H512l-64 128H0l128-384L0 640h448l64 128h256L512 0h448l384 768h448zm0 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10h-527q-99-192-193-383T881 128H690q64 193 127 384t129 384H433l-64-128H178q21 64 41 128t44 128q-23 64-43 128t-42 128h191l64-128h513q-66 192-129 383t-127 385h191q97-193 191-384t193-384h527z" />
    </svg>
  ),
  displayName: 'AirplaneIcon',
});

export default AirplaneIcon;
