import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RadioBulletIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 640q79 0 149 30t122 82 83 123 30 149q0 80-30 149t-82 122-123 83-149 30q-80 0-149-30t-122-82-83-122-30-150q0-79 30-149t82-122 122-83 150-30z" />
    </svg>
  ),
  displayName: 'RadioBulletIcon',
});

export default RadioBulletIcon;
