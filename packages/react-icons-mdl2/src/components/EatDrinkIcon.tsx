import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EatDrinkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 0q26 0 45 19t19 45v704q0 53-20 99t-55 81-82 55-99 21v960q0 26-19 45t-45 19q-26 0-45-19t-19-45v-960q-53 0-99-20t-81-55-55-81-21-100V64q0-26 19-45t45-19q26 0 45 19t19 45v704q0 27 10 50t27 40 41 28 50 10V64q0-26 19-45t45-19q26 0 45 19t19 45v832q27 0 50-10t40-27 28-41 10-50V64q0-26 19-45t45-19zm704 0v1984q0 26-19 45t-45 19q-26 0-45-19t-19-45v-576q-37 0-80 1t-85-1-82-12-70-31-49-57-18-92V448q0-93 35-174t96-142 142-96 175-36h64zm-128 134q-56 11-102 40t-81 72-54 93-19 109v768q0 26 19 45t45 19h192V134z" />
    </svg>
  ),
  displayName: 'EatDrinkIcon',
});

export default EatDrinkIcon;
