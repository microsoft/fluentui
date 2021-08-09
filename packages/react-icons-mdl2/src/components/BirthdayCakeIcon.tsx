import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BirthdayCakeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1920v128H0v-128h128v-576q0-66 25-124t68-101 102-69 125-26h448V672q0-9 7-15t18-10 22-5 17-2q6 0 17 1t21 5 18 10 8 16v352h448q66 0 124 25t101 69 69 102 26 124v576h128zM448 1152q-37 0-70 13t-58 36-42 54-21 68q37 41 86 63t105 22q66 0 114-26t91-76q11-12 22-19t29-7q17 0 28 7t23 19q42 49 90 75t115 27q66 0 114-26t91-76q11-12 22-19t29-7q17 0 28 7t23 19q42 49 90 75t115 27q55 0 104-22t87-63q-4-36-20-67t-42-55-59-36-70-13H448zm-192 768h1408v-435q-48 24-93 37t-99 14q-72 0-137-24t-119-73q-54 48-119 72t-137 25q-72 0-137-24t-119-73q-54 48-119 72t-137 25q-54 0-99-13t-93-38v435zM960 512q-26 0-45-19t-19-45q0-12 8-31t18-40 21-40 17-30q6 11 16 30t21 40 19 40 8 31q0 26-19 45t-45 19z" />
    </svg>
  ),
  displayName: 'BirthdayCakeIcon',
});

export default BirthdayCakeIcon;
