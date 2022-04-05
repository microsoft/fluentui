import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PinSolid12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1963 512h85v853h-85q-103 0-190-44t-150-126h-317q-37 78-93 141t-127 107-151 69-167 24h-85v-512H171L0 939l171-86h512V341h85q86 0 167 24t151 69 127 108 93 141h317q62-81 149-126t191-45z" />
    </svg>
  ),
  displayName: 'PinSolid12Icon',
});

export default PinSolid12Icon;
