import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EducationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1582 1065q41 72 61 150t21 161v103l-640 321-640-321q0-60 1-112t9-101 24-98 48-103L256 960v587q29 10 52 28t41 42 26 52 9 59v320H0v-320q0-30 9-58t26-53 40-42 53-28V896L0 832l1024-512 1024 512-466 233zM256 1728q0-26-19-45t-45-19q-26 0-45 19t-19 45v192h128v-192zm30-896l738 369 738-369-738-369-738 369zm1250 568q0-77-15-143t-53-135l-444 222-444-222q-33 58-50 122t-18 132v24l512 256 512-256z" />
    </svg>
  ),
  displayName: 'EducationIcon',
});

export default EducationIcon;
