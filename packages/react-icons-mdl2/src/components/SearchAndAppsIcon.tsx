import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SearchAndAppsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 896q79 0 149 30t122 83 82 122 31 149q0 79-30 149t-83 122-122 82-149 31q-60 0-117-18t-105-53q-16 16-53 55t-87 90-103 105-103 100-85 75-51 30q-26 0-45-19t-19-45q0-14 29-51t75-85 100-102 105-104 90-86 56-54q-35-48-53-105t-18-117q0-79 30-149t83-122 122-82 149-31zm0 640q52 0 99-20t81-55 55-81 21-100q0-52-20-99t-55-81-82-55-99-21q-53 0-99 20t-81 55-55 82-21 99q0 53 20 99t55 81 81 55 100 21zM256 1408v-256H0V0h1536v256h256v530q-32-8-64-13t-64-5V384H384v896h768q0 32 5 64t13 64H256zm0-384V256h1152V128H128v896h128z" />
    </svg>
  ),
  displayName: 'SearchAndAppsIcon',
});

export default SearchAndAppsIcon;
