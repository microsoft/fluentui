import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const SwayLogo16Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 256v1536q0 27-10 50t-27 40-41 28-50 10h-640v128L0 1824V224L1280 0v128h640q27 0 50 10t40 27 28 41 10 50zM912 1256q0-79-26-133t-65-94-85-67-85-54-65-54-26-68q0-25 9-42t26-28 36-15 43-5q32 0 58 5t49 16 45 26 47 34V516q-45-18-89-25t-93-8q-77 0-141 21t-112 62-73 102-26 142q0 78 25 131t62 91 81 66 81 53 62 53 25 67q0 44-28 63t-69 20q-40 0-72-10t-61-29-53-42-50-53v269q24 21 55 35t66 24 70 14 66 4q72 0 130-21t98-61 63-97 22-131zM1920 256h-640v567l113-145q14-18 35-28t44-11q23 0 44 10t35 29l369 474h-640v128h512v128h-512v128h512v128h-512v128h640V256zm-128 128v128h-128V384h128z" />
    </svg>
  ),
  displayName: 'SwayLogo16Icon',
});

export default SwayLogo16Icon;
