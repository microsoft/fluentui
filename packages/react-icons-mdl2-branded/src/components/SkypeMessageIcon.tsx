import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const SkypeMessageIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 87q127 0 252 8t251 35q125 26 226 88t172 170q66 102 94 223t29 242q0 98-15 185t-50 166-90 147-134 129q-154 118-306 233t-306 233q-20 15-47 15-17 0-30-7t-24-18-16-26-6-31v-282H770q-61 0-124-5t-126-18-121-36-110-58q-78-54-133-124t-89-152-51-170T0 853q0-124 28-242t98-223q72-109 170-170t225-88q125-26 250-34t253-9zm64 937q26 0 45-19t19-45q0-26-19-45t-45-19H576q-26 0-45 19t-19 45q0 26 19 45t45 19h512zm380-256q29 0 48-17t20-47q0-29-19-46t-49-18H580q-28 0-48 17t-20 47q0 29 20 46t48 18h888z" />
    </svg>
  ),
  displayName: 'SkypeMessageIcon',
});

export default SkypeMessageIcon;
