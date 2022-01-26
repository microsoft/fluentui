import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrangeByFromIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 632v464q-41-114-128-201v-36l-19 18q-24-22-50-40t-56-35l102-102-873-436-873 436 324 324h581q-16 31-28 62t-21 66H421L128 859v933h787q-25 61-39 128H0V632l1024-512 1024 512zm-284 957q65 32 117 80t90 109 57 129 20 141h-128q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149h-128q0-72 20-141t57-129 89-108 118-81q-74-55-115-136t-41-173q0-79 30-149t82-122 122-83 150-30q79 0 149 30t122 82 83 123 30 149q0 92-41 173t-115 136zm-484-309q0 53 20 99t55 82 81 55 100 20q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100z" />
    </svg>
  ),
  displayName: 'ArrangeByFromIcon',
});

export default ArrangeByFromIcon;
