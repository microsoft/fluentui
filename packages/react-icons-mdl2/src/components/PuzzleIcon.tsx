import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PuzzleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1600 896q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10h192v512h-384v64q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100v-64H512v-384h-64q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20h64V384h384v-64q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100v64h384v512h-192zm0 384q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20h64V512h-384V320q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50v192H640v384H448q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10h192v384h384v192q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50v-192h384v-256h-64z" />
    </svg>
  ),
  displayName: 'PuzzleIcon',
});

export default PuzzleIcon;
