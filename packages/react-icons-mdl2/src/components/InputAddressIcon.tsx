import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InputAddressIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 768v512h1152v128H0V640h1033q15 35 36 67t48 61H128zm1783-128h137v768h-384v-128h256V768h-93q26-29 47-61t37-67zm-375 122v1030l-64 128-64-128V762q-56-12-103-41t-81-70-53-94-19-109q0-66 25-124t68-102 102-69 125-25q66 0 124 25t101 69 69 102 26 124q0 57-19 109t-53 93-81 71-103 41zm128-314q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75q0 40 15 75t41 61 61 41 75 15q40 0 75-15t61-41 41-61 15-75z" />
    </svg>
  ),
  displayName: 'InputAddressIcon',
});

export default InputAddressIcon;
