import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SwitchUserIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1339 1152h-187q-83-63-181-95t-203-33q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H0q0-120 35-231t101-205 156-167 204-115q-56-35-100-82t-76-104-47-119-17-129q0-106 40-199t110-162T569 41 768 0q106 0 199 40t162 110 110 163 41 199q0 66-16 129t-48 119-75 103-101 83q86 32 162 84t137 122zM384 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149zm768 768h554l-85-85 86-86 236 235-236 235-86-86 85-85h-554v-128zm299 299l-85 85h554v128h-554l85 85-86 86-236-235 236-235 86 86z" />
    </svg>
  ),
  displayName: 'SwitchUserIcon',
});

export default SwitchUserIcon;
