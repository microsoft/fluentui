import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IDBadgeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1568 384q40 0 68 28t28 68v1472q0 40-28 68t-68 28H480q-40 0-68-28t-28-68V480q0-40 28-68t68-28h312L600 0h144l192 384h176L1304 0h144l-192 384h312zm-32 128h-536l81 163q7 16 7 29 0 26-19 45t-45 19q-18 0-33-9t-24-26L856 512H512v1408h1024V512zm-768 640q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 49-18 95t-52 81q46 25 82 61t62 80 40 93 14 102h-128q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100H640q0-52 14-101t39-94 62-80 83-61q-33-35-51-81t-19-95zm384 0q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50z" />
    </svg>
  ),
  displayName: 'IDBadgeIcon',
});

export default IDBadgeIcon;
