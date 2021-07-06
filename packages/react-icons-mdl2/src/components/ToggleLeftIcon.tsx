import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ToggleLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1024q0 106-40 199t-109 163-163 110-200 40H512q-106 0-199-40t-163-109-110-163-40-200q0-106 40-199t109-163 163-110 200-40h1024q106 0 199 40t163 109 110 163 40 200zm-512 384q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30H512q-80 0-149 30t-122 82-83 123-30 149q0 80 30 149t82 122 122 83 150 30h1024zM512 768q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20z" />
    </svg>
  ),
  displayName: 'ToggleLeftIcon',
});

export default ToggleLeftIcon;
