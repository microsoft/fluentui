import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VerifiedBrandSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1845 1024l124 155q18 23 28 50t10 57q0 30-9 57t-26 49-41 38-52 24l-191 53q2 51 5 103t4 104q0 36-13 67t-37 54-55 37-68 14q-31 0-61-11l-185-70-109 165q-24 37-62 57t-83 21q-44 0-82-20t-63-58l-109-165-185 70q-30 11-61 11-36 0-67-13t-55-37-37-55-14-67q0-52 3-104t6-103l-191-53q-29-8-52-24t-40-38-26-49-10-57q0-29 10-56t28-51l124-155L79 869q-38-47-38-107 0-30 9-57t26-49 40-38 53-24l191-53q-2-51-5-103t-4-104q0-36 13-67t37-54 55-37 68-14q31 0 61 11l185 70L879 78q24-37 62-57t83-21q44 0 82 20t63 58l109 165 185-70q30-11 61-11 36 0 67 13t55 37 37 55 14 67q0 52-3 104t-6 103l191 53q28 8 52 24t40 38 26 49 10 57q0 60-38 107l-124 155zm-949 369l569-568-114-114-455 456-199-200-114 114 313 312z" />
    </svg>
  ),
  displayName: 'VerifiedBrandSolidIcon',
});

export default VerifiedBrandSolidIcon;
