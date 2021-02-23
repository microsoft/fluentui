import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OfficeLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1792 405v1238q0 65-38 115t-101 69l-555 159q-11 3-23 4t-24 2q-32 0-58-8t-53-24l-363-205q-20-11-31-29t-12-42q0-35 24-59t60-25h470V458L735 584q-43 15-69 53t-26 83v651q0 40-20 73t-55 53l-167 91q-23 12-46 12-40 0-68-28t-28-68V587q0-50 26-96t71-71L949 81q20-11 43-17t46-6q17 0 30 2t30 8l555 153q31 9 56 26t44 42 29 54 10 62zm-128 1238V405q0-22-13-38t-34-23l-273-75-64-18-64-18v1586l401-115q21-6 34-22t13-39z" />
    </svg>
  ),
  displayName: 'OfficeLogoIcon',
});

export default OfficeLogoIcon;
