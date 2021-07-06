import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ImageSearchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 576q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45zm384-320v639q-28-28-60-50t-68-42V384H128v677l448-447 556 555q-12 54-12 111 0 16 2 32t4 32L576 794l-448 449v421h835l-128 128H0V256h2048zm-384 640q79 0 149 30t122 82 83 123 30 149q0 80-30 149t-82 122-123 83-149 30q-60 0-116-18t-106-54l-437 437q-19 19-45 19t-45-19-19-45q0-26 19-45l437-437q-35-49-53-105t-19-117q0-79 30-149t82-122 122-83 150-30zm0 640q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20z" />
    </svg>
  ),
  displayName: 'ImageSearchIcon',
});

export default ImageSearchIcon;
