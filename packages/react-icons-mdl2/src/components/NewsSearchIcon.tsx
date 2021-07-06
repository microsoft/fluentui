import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NewsSearchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1487 768q-59 20-111 52t-97 76h-255V768h463zm-367 512q0 32 4 64t13 64h-113v-128h96zm928-768v383q-28-28-60-50t-68-42V640h-128v113q-32-8-64-12t-64-5V384H128v1031q0 25 9 47t26 38 39 26 47 10h842l-128 128H249q-51 0-96-19t-80-54-53-79-20-97V256h1792v256h256zm-512 128H256V512h1280v128zM256 768h640v640H256V768zm128 512h384V896H384v384zm640-256h128v79q-9 25-15 49h-113v-128zm640-128q79 0 149 30t122 82 83 123 30 149q0 80-30 149t-82 122-123 83-149 30q-60 0-116-18t-106-54l-437 437q-19 19-45 19t-45-19-19-45q0-26 19-45l437-437q-35-49-53-105t-19-117q0-79 30-149t82-122 122-83 150-30zm0 640q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20z" />
    </svg>
  ),
  displayName: 'NewsSearchIcon',
});

export default NewsSearchIcon;
