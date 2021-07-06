import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FlameSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1821 1315q0 102-26 195t-73 175-115 149-148 114-175 74-196 26q-102 0-195-26t-175-73-149-115-114-148-74-175-26-196q0-99 25-195t79-181q21 42 45 83t55 73 72 53 93 20q46 0 86-17t70-48 47-70 18-86q0-39-12-70t-34-63q-26-37-45-72t-33-71-19-76-7-86q0-95 33-182t93-155 140-114 176-58q15 214 100 392t234 331q122 125 186 271t64 321z" />
    </svg>
  ),
  displayName: 'FlameSolidIcon',
});

export default FlameSolidIcon;
